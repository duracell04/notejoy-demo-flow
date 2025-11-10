import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Servicer = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Servicer</h1>
          <Badge variant="outline">DvP Timeline & Servicing</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The servicer dashboard is under development. Here you'll be able to view DvP timelines, 
              reconcile fiat and USDC payment legs, and confirm coupon payments.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Servicer;
