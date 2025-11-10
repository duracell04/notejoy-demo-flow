import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Investor = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Investor</h1>
          <Badge variant="outline">Private Debt Investment Dashboard</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The investor dashboard is under development. Here you'll be able to browse available debt instruments, 
              check eligibility, track your holdings, and monitor coupon payments.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Investor;
