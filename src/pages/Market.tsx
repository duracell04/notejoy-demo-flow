import { useMemo, useState } from "react";
import { getMockNotes } from "@/mocks/notes";
import { loadIssuerState, saveIssuerState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { NavLink } from "@/components/NavLink";
import { BondCard } from "@/components/market/BondCard";
import { MarketStats } from "@/components/market/MarketStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Listed = {
  id: number;
  name: string;
  issuer?: string;
  notional: number;
  couponRate: number;
  ytm?: number;
  price?: number;
  bid?: number;
  ask?: number;
  rating?: string;
  volume24h?: number;
  basis: "ACT/360" | "30/360";
  periodDays: number;
  maturity: number;
  source: "seed" | "issuer";
};

const Market = () => {
  const [tick, setTick] = useState(0);
  const st = loadIssuerState();

  const issuerItems = (st.instruments ?? []).map<Listed>((d, i) => ({
    id: 1000 + i,
    name: d.name,
    issuer: st.company?.legalName ?? "Unknown Issuer",
    notional: d.notional,
    couponRate: d.apr,
    ytm: d.apr * 1.02, // mock: slightly different
    price: 100 + (Math.random() - 0.5) * 5,
    bid: 99.5,
    ask: 100.5,
    rating: "Not Rated",
    volume24h: 0,
    basis: d.basis,
    periodDays: d.periodDays,
    maturity: Date.parse(d.maturityISO),
    source: "issuer" as const
  }));

  const seedItems = getMockNotes().map<Listed>(n => ({
    id: n.id,
    name: `${n.issuer} Note`,
    issuer: n.issuer,
    notional: n.notional,
    couponRate: n.couponRate,
    ytm: n.ytm,
    price: n.price,
    bid: n.bid,
    ask: n.ask,
    rating: n.rating,
    volume24h: n.volume24h,
    basis: n.basis,
    periodDays: n.periodDays,
    maturity: n.maturity,
    source: "seed" as const
  }));

  const market = useMemo(() => {
    const listedSet = new Set(st.listedIds);
    // Show all seed items in the market (always listed)
    const listedSeed = seedItems;
    const listedIssuer = issuerItems.filter((_, i) => listedSet.has(1000 + i));
    const listableIssuer = issuerItems.filter((_, i) => !listedSet.has(1000 + i));
    
    const allListed = [...listedSeed, ...listedIssuer];
    
    // Calculate market stats
    const totalVolume = allListed.reduce((sum, n) => sum + (n.volume24h ?? 0), 0);
    const averageYield = allListed.reduce((sum, n) => sum + (n.ytm ?? 0), 0) / allListed.length;
    const totalNotional = allListed.reduce((sum, n) => sum + n.notional, 0);
    
    return { 
      allListed, 
      listableIssuer,
      stats: {
        totalVolume,
        averageYield,
        activeInstruments: allListed.length,
        totalNotional
      }
    };
  }, [st.listedIds, st.instruments, tick]);

  function listIssuerDraft(idx: number) {
    if (st.audit !== "approved") {
      toast.error("Audit must be approved before listing");
      return;
    }
    const seedMax = Math.max(...getMockNotes().map(n => n.id));
    const newId = Math.max(seedMax, ...(st.listedIds ?? []), 1000) + 1;
    const next = { ...st, listedIds: [...(st.listedIds ?? []), newId] };
    saveIssuerState(next);
    toast.success(`Listed "${st.instruments[idx].name}" as Token #${newId} (mock)`);
    setTick(x => x + 1);
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Private Debt Market</h1>
          <Badge variant="outline">Fixed-Income Tokenized Notes</Badge>
          <p className="text-muted-foreground mt-2">
            Trade institutional-grade private debt instruments with smart-contract coupons.
          </p>
        </div>

        <MarketStats {...market.stats} />

        <Tabs defaultValue="listed" className="w-full">
          <TabsList>
            <TabsTrigger value="listed">Listed Instruments ({market.allListed.length})</TabsTrigger>
            {st.registered && st.audit === "approved" && (
              <TabsTrigger value="drafts">Your Drafts ({market.listableIssuer.length})</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="listed" className="space-y-4 mt-6">
            {market.allListed.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    No instruments listed yet. Be the first to list your private debt token.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {market.allListed.map(n => (
                  <BondCard
                    key={n.id}
                    id={n.id}
                    issuer={n.issuer ?? n.name}
                    couponRate={n.couponRate}
                    ytm={n.ytm ?? n.couponRate}
                    price={n.price ?? 100}
                    bid={n.bid ?? 99.5}
                    ask={n.ask ?? 100.5}
                    rating={n.rating ?? "NR"}
                    maturity={n.maturity}
                    volume24h={n.volume24h ?? 0}
                    basis={n.basis}
                    periodDays={n.periodDays}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {st.registered && st.audit === "approved" && (
            <TabsContent value="drafts" className="space-y-4 mt-6">
              {market.listableIssuer.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-center py-8">
                      No drafts ready to list. Create instruments in{" "}
                      <NavLink to="/issuer/onboard" className="text-primary hover:underline">
                        Issuer Onboarding
                      </NavLink>.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Ready to List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Instrument</TableHead>
                          <TableHead>Coupon</TableHead>
                          <TableHead>Basis</TableHead>
                          <TableHead>Period</TableHead>
                          <TableHead>Maturity</TableHead>
                          <TableHead>Notional</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {market.listableIssuer.map((n, i) => {
                          const originalIndex = issuerItems.findIndex(item => item.id === n.id);
                          return (
                            <TableRow key={n.id}>
                              <TableCell className="font-medium">{n.name}</TableCell>
                              <TableCell>{(n.couponRate * 100).toFixed(2)}%</TableCell>
                              <TableCell>{n.basis}</TableCell>
                              <TableCell>{n.periodDays}d</TableCell>
                              <TableCell>{new Date(n.maturity).toISOString().slice(0, 10)}</TableCell>
                              <TableCell>${(n.notional / 1000).toFixed(0)}k</TableCell>
                              <TableCell>
                                <Button size="sm" onClick={() => listIssuerDraft(originalIndex)}>
                                  List Now
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>

        {!st.registered && (
          <Card className="border-primary/50">
            <CardContent className="pt-6">
              <div className="text-center py-4">
                <h3 className="font-semibold text-lg mb-2">Want to list your instruments?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Complete issuer onboarding to register your company and list private debt tokens.
                </p>
                <Button asChild>
                  <NavLink to="/issuer/onboard">Start Onboarding</NavLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {st.registered && st.audit !== "approved" && (
          <Card className="border-primary/50">
            <CardContent className="pt-6">
              <div className="text-center py-4">
                <h3 className="font-semibold text-lg mb-2">Audit Pending</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Your audit status is <strong>{st.audit}</strong>. Complete the audit process to list instruments.
                </p>
                <Button asChild>
                  <NavLink to="/issuer/onboard">Continue Onboarding</NavLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Market;
