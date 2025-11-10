import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: "send" | "receive";
  token: string;
  amount: string;
  address: string;
  timestamp: string;
  status: "verified" | "pending" | "flagged";
  complianceScore: number;
  hash: string;
}

interface TransactionDetailProps {
  transaction: Transaction;
  onClose: () => void;
}

export const TransactionDetail = ({ transaction, onClose }: TransactionDetailProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Status */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-accent/30">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-foreground" />
              <span className="font-semibold">Compliance Status</span>
            </div>
            <Badge className="bg-foreground text-background">
              {transaction.status.toUpperCase()}
            </Badge>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-3xl font-black">
              {transaction.type === "receive" ? "+" : "-"}${transaction.amount} {transaction.token}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-semibold capitalize">{transaction.type}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <p className="font-semibold">{transaction.complianceScore}/100</p>
            </div>

            <div className="space-y-1 col-span-2">
              <p className="text-sm text-muted-foreground">Address</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm">{transaction.address}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(transaction.address)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-1 col-span-2">
              <p className="text-sm text-muted-foreground">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs break-all text-muted-foreground">
                  {transaction.hash}
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(transaction.hash)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{transaction.timestamp}</p>
            </div>
          </div>

          {/* Compliance Checks */}
          <div className="space-y-3 p-4 rounded-lg border border-border">
            <p className="font-semibold">Compliance Checks</p>
            <div className="space-y-2">
              {["AML Screening", "Sanctions Check", "Source Verification", "KYC Validated"].map((check) => (
                <div key={check} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{check}</span>
                  <CheckCircle2 className="w-4 h-4 text-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
