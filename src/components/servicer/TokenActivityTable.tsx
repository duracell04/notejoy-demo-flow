import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMockTokenActivity } from "@/mocks/servicer";
import { ArrowUpRight, ArrowDownRight, ArrowRightLeft } from "lucide-react";

export function TokenActivityTable() {
  const activity = getMockTokenActivity();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity.map((tx, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">#{tx.tokenId}</TableCell>
                <TableCell>
                  <Badge 
                    variant={tx.type === "buy" ? "default" : tx.type === "sell" ? "secondary" : "outline"}
                    className="flex items-center gap-1 w-fit"
                  >
                    {tx.type === "buy" && <ArrowUpRight className="h-3 w-3" />}
                    {tx.type === "sell" && <ArrowDownRight className="h-3 w-3" />}
                    {tx.type === "transfer" && <ArrowRightLeft className="h-3 w-3" />}
                    {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>${tx.amount.toLocaleString()}</TableCell>
                <TableCell>{tx.price.toFixed(2)}</TableCell>
                <TableCell className="font-mono text-xs">{tx.from}</TableCell>
                <TableCell className="font-mono text-xs">{tx.to}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(tx.date).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
