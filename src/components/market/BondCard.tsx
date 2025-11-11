import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BondCardProps {
  id: number;
  issuer: string;
  couponRate: number;
  ytm: number;
  price: number;
  bid: number;
  ask: number;
  rating: string;
  maturity: number;
  volume24h: number;
  basis: string;
  periodDays: number;
}

export const BondCard = ({
  id,
  issuer,
  couponRate,
  ytm,
  price,
  bid,
  ask,
  rating,
  maturity,
  volume24h,
  basis,
  periodDays
}: BondCardProps) => {
  const spread = ((ask - bid) / price * 100).toFixed(3);
  const priceChange = price - 100; // vs par
  const isAbovePar = priceChange > 0;
  
  const getRatingColor = (rating: string) => {
    if (rating.startsWith('A')) return 'default';
    if (rating.startsWith('BBB')) return 'secondary';
    return 'outline';
  };

  const maturityDate = new Date(maturity);
  const daysToMaturity = Math.ceil((maturity - Date.now()) / (1000 * 60 * 60 * 24));
  const yearsToMaturity = (daysToMaturity / 365).toFixed(1);

  return (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-1">
              <h3 className="font-semibold text-lg">{issuer}</h3>
              <Badge variant={getRatingColor(rating)} className="text-xs">
                {rating}
              </Badge>
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>Token #{id}</span>
              <span>•</span>
              <span>{basis}</span>
              <span>•</span>
              <span>{periodDays}d coupon</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <span className="text-2xl font-bold">{price.toFixed(2)}</span>
              {isAbovePar ? (
                <TrendingUp className="w-4 h-4 text-primary" />
              ) : (
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className={`text-xs ${isAbovePar ? 'text-primary' : 'text-muted-foreground'}`}>
              {isAbovePar ? '+' : ''}{priceChange.toFixed(2)}% vs par
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Coupon Rate</div>
            <div className="font-semibold">{(couponRate * 100).toFixed(2)}%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Yield (YTM)</div>
            <div className="font-semibold">{(ytm * 100).toFixed(2)}%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Bid / Ask</div>
            <div className="font-semibold text-sm">{bid.toFixed(2)} / {ask.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Spread: {spread}%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">24h Volume</div>
            <div className="font-semibold">${(volume24h / 1000).toFixed(0)}k</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Maturity: <span className="font-medium text-foreground">
              {maturityDate.toISOString().slice(0, 10)}
            </span>
            <span className="ml-2">({yearsToMaturity}y)</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Details</Button>
            <Button size="sm">Trade</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
