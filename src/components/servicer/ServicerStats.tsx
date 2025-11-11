import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockPipeline, getMockTokenActivity, getMockCouponSchedule } from "@/mocks/servicer";

export function ServicerStats() {
  const pipeline = getMockPipeline();
  const activity = getMockTokenActivity();
  const schedule = getMockCouponSchedule();

  const activeIssuers = pipeline.length;
  const totalNotional = pipeline.reduce((sum, item) => sum + item.notional, 0);
  const totalVolume = activity.reduce((sum, tx) => sum + tx.amount, 0);
  const upcomingPayments = schedule.filter(c => c.status === "upcoming" || c.status === "processing").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Issuers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeIssuers}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Notional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(totalNotional / 1000000).toFixed(2)}M</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            24h Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(totalVolume / 1000).toFixed(0)}K</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Upcoming Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingPayments}</div>
        </CardContent>
      </Card>
    </div>
  );
}
