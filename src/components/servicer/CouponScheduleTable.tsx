import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMockCouponSchedule } from "@/mocks/servicer";
import { toast } from "sonner";

export function CouponScheduleTable() {
  const schedule = getMockCouponSchedule();

  function confirmPayment(tokenId: number) {
    toast.success(`Coupon payment confirmed for Token #${tokenId} (mock)`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coupon Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Instrument</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Holders</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((coupon) => (
              <TableRow key={coupon.tokenId}>
                <TableCell className="font-medium">#{coupon.tokenId}</TableCell>
                <TableCell>{coupon.instrument}</TableCell>
                <TableCell>
                  {new Date(coupon.paymentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${coupon.amount.toLocaleString()}</TableCell>
                <TableCell>{coupon.holders}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      coupon.status === "paid" ? "default" : 
                      coupon.status === "overdue" ? "destructive" : 
                      "outline"
                    }
                  >
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {coupon.status === "processing" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => confirmPayment(coupon.tokenId)}
                    >
                      Confirm
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
