import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Activity, PieChart } from "lucide-react";

interface MarketStatsProps {
  totalVolume: number;
  averageYield: number;
  activeInstruments: number;
  totalNotional: number;
}

export const MarketStats = ({
  totalVolume,
  averageYield,
  activeInstruments,
  totalNotional
}: MarketStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">24h Volume</div>
          </div>
          <div className="text-2xl font-bold">${(totalVolume / 1000000).toFixed(2)}M</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">Avg Yield</div>
          </div>
          <div className="text-2xl font-bold">{(averageYield * 100).toFixed(2)}%</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">Active Notes</div>
          </div>
          <div className="text-2xl font-bold">{activeInstruments}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PieChart className="w-4 h-4 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">Total Notional</div>
          </div>
          <div className="text-2xl font-bold">${(totalNotional / 1000000).toFixed(1)}M</div>
        </CardContent>
      </Card>
    </div>
  );
};
