import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicerStats } from "@/components/servicer/ServicerStats";
import { PipelineTable } from "@/components/servicer/PipelineTable";
import { TokenActivityTable } from "@/components/servicer/TokenActivityTable";
import { CouponScheduleTable } from "@/components/servicer/CouponScheduleTable";
import { DvPTimeline } from "@/components/servicer/DvPTimeline";

const Servicer = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Servicer</h1>
          <Badge variant="outline">Note Servicing & Operations Dashboard</Badge>
          <p className="text-muted-foreground mt-2">
            Monitor issuer pipeline, token activity, coupon payments, and DvP settlements.
          </p>
        </div>

        <ServicerStats />

        <Tabs defaultValue="pipeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="activity">Token Activity</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
            <TabsTrigger value="dvp">DvP Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline">
            <PipelineTable />
          </TabsContent>

          <TabsContent value="activity">
            <TokenActivityTable />
          </TabsContent>

          <TabsContent value="coupons">
            <CouponScheduleTable />
          </TabsContent>

          <TabsContent value="dvp">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DvPTimeline />
              <div className="space-y-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-semibold">About DvP</h3>
                  <p className="text-sm text-muted-foreground">
                    Delivery vs Payment ensures atomic settlement: tokens transfer only when payment is confirmed.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li><strong>Fiat Leg:</strong> ISO 20022 camt.054 (credit notification) confirms bank receipt</li>
                    <li><strong>USDC Leg:</strong> On-chain stablecoin settlement confirmation</li>
                    <li><strong>Matched:</strong> Both legs confirmed, settlement complete</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-semibold">Servicing Workflow</h3>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Coupon payment date approaches</li>
                    <li>Servicer prepares payment instructions</li>
                    <li>Fiat payment sent via bank (camt.054 received)</li>
                    <li>USDC payment executed on-chain</li>
                    <li>Both legs matched → DvP complete</li>
                    <li>Token holders receive coupon payments</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Servicer;
