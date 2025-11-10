import { useMemo, useState } from "react";
import { getMockNotes } from "@/mocks/notes";
import { loadIssuerState, saveIssuerState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { NavLink } from "@/components/NavLink";

type Listed = {
  id: number;
  name: string;
  notional: number;
  apr: number;
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
    notional: d.notional,
    apr: d.apr,
    basis: d.basis,
    periodDays: d.periodDays,
    maturity: Date.parse(d.maturityISO),
    source: "issuer" as const
  }));

  const seedItems = getMockNotes().map<Listed>(n => ({
    id: n.id,
    name: `Note #${n.id}`,
    notional: n.notional,
    apr: n.apr,
    basis: n.basis,
    periodDays: n.periodDays,
    maturity: n.maturity,
    source: "seed" as const
  }));

  const market = useMemo(() => {
    const listedSet = new Set(st.listedIds);
    const listedSeed = seedItems.filter(n => listedSet.has(n.id));
    const listableIssuer = issuerItems.filter(_ => true);
    return { listedSeed, listableIssuer };
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Market</h1>
            <Badge variant="outline">Private Debt Tokens</Badge>
            <p className="text-muted-foreground mt-2">
              Fixed-income notes with smart-contract coupons (mock).
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Listed Instruments</CardTitle>
            </CardHeader>
            <CardContent>
              {market.listedSeed.length === 0 && (st.listedIds?.length ?? 0) === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No tokens listed yet. Seed notes are hidden until "listed" (demo choice).
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>APR</TableHead>
                      <TableHead>Basis</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Maturity</TableHead>
                      <TableHead>Notional</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {market.listedSeed.map(n => (
                      <TableRow key={n.id}>
                        <TableCell>#{n.id}</TableCell>
                        <TableCell>{n.name}</TableCell>
                        <TableCell>{(n.apr * 100).toFixed(2)}%</TableCell>
                        <TableCell>{n.basis}</TableCell>
                        <TableCell>{n.periodDays}d</TableCell>
                        <TableCell>{new Date(n.maturity).toISOString().slice(0, 10)}</TableCell>
                        <TableCell>{n.notional.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {st.registered && st.audit === "approved" && (
            <Card>
              <CardHeader>
                <CardTitle>Your Drafts (Ready to List)</CardTitle>
              </CardHeader>
              <CardContent>
                {issuerItems.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No drafts yet. Create one in onboarding.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Draft</TableHead>
                        <TableHead>APR</TableHead>
                        <TableHead>Basis</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Maturity</TableHead>
                        <TableHead>Notional</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issuerItems.map((n, i) => (
                        <TableRow key={n.id}>
                          <TableCell>{n.name}</TableCell>
                          <TableCell>{(n.apr * 100).toFixed(2)}%</TableCell>
                          <TableCell>{n.basis}</TableCell>
                          <TableCell>{n.periodDays}d</TableCell>
                          <TableCell>{new Date(n.maturity).toISOString().slice(0, 10)}</TableCell>
                          <TableCell>{n.notional.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => listIssuerDraft(i)}>
                              List (mock)
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}

          {!st.registered && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm">
                  To list, go to{" "}
                  <NavLink to="/issuer/onboard" className="text-primary hover:underline">
                    Issuer Onboarding
                  </NavLink>{" "}
                  to register and pass audit (mock).
                </p>
              </CardContent>
            </Card>
          )}

          {st.registered && st.audit !== "approved" && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm">
                  Audit is <strong>{st.audit}</strong>. Approve it in{" "}
                  <NavLink to="/issuer/onboard" className="text-primary hover:underline">
                    onboarding
                  </NavLink>{" "}
                  to list.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="space-y-2">
              <p>
                This platform is for <strong>private debt tokenization</strong>. Issuers register companies, pass audit, and list fixed-income notes with smart-contract coupons (mocked here).
              </p>
              <ul className="list-disc list-inside space-y-1 mt-4">
                <li>Issuer KYB/Audit (mocked)</li>
                <li>Fixed coupons (ACT/360, 30/360)</li>
                <li>Compliance messaging (ERC-1404 style)</li>
                <li>DvP timeline for servicing</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Market;
