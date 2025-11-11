import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getMockDvPLegs } from "@/mocks/servicer";

export function DvPTimeline() {
  const legs = getMockDvPLegs();

  function getProgress(fiatStatus: string, usdcStatus: string): number {
    if (fiatStatus === "matched" && usdcStatus === "matched") return 100;
    if (fiatStatus === "confirmed" && usdcStatus === "matched") return 75;
    if (fiatStatus === "confirmed" && usdcStatus === "confirmed") return 50;
    if (fiatStatus === "confirmed" || usdcStatus === "confirmed") return 33;
    return 0;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>DvP Settlement Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Delivery vs Payment tracking: Fiat (ISO 20022 camt.054) and USDC legs (mock).
        </p>
        
        {legs.map((leg) => {
          const progress = getProgress(leg.fiatStatus, leg.usdcStatus);
          
          return (
            <div key={leg.id} className="space-y-2 border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">Token #{leg.tokenId}</div>
                  <div className="text-sm text-muted-foreground">{leg.instrument}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${leg.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(leg.settlementDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="text-xs font-medium">Fiat Leg</div>
                  <Badge 
                    variant={leg.fiatStatus === "matched" ? "default" : "outline"}
                    className="w-full justify-center"
                  >
                    {leg.fiatStatus}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium">USDC Leg</div>
                  <Badge 
                    variant={leg.usdcStatus === "matched" ? "default" : "outline"}
                    className="w-full justify-center"
                  >
                    {leg.usdcStatus}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Settlement Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
