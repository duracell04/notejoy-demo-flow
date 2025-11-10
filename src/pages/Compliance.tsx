import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Compliance = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Compliance</h1>
          <Badge variant="outline">Transfer Eligibility & Checks</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The compliance dashboard is under development. Here you'll be able to check transfer eligibility, 
              view ERC-1404-style reason codes, and ensure regulatory compliance.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Compliance;
