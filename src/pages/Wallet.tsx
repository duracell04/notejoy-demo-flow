import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { TransactionDetail } from "@/components/wallet/TransactionDetail";

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

const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "receive",
    token: "USDC",
    amount: "5,000.00",
    address: "0x742d...4a8f",
    timestamp: "2 hours ago",
    status: "verified",
    complianceScore: 98,
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890"
  },
  {
    id: "2",
    type: "send",
    token: "USDT",
    amount: "2,500.00",
    address: "0x8b2c...9f1a",
    timestamp: "5 hours ago",
    status: "verified",
    complianceScore: 95,
    hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab"
  },
  {
    id: "3",
    type: "receive",
    token: "USDC",
    amount: "10,250.50",
    address: "0x3f9a...2c5d",
    timestamp: "1 day ago",
    status: "pending",
    complianceScore: 87,
    hash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd"
  },
  {
    id: "4",
    type: "send",
    token: "DAI",
    amount: "1,750.00",
    address: "0x5e7b...8d3f",
    timestamp: "2 days ago",
    status: "verified",
    complianceScore: 99,
    hash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  },
];

const Wallet = () => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const totalBalance = "85,432.50";

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container mx-auto px-6 py-12">
        {/* Balance Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-card/50 border-border">
          <div className="space-y-2 mb-6">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <h2 className="text-5xl font-black">${totalBalance}</h2>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-ink text-paper hover:bg-ink/90">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Send
            </Button>
            <Button variant="outline">
              <ArrowDownLeft className="w-4 h-4 mr-2" />
              Receive
            </Button>
          </div>
        </Card>

        {/* Transactions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Transactions</h3>
            <Badge variant="outline" className="text-xs">
              {DUMMY_TRANSACTIONS.length} Total
            </Badge>
          </div>

          <div className="space-y-3">
            {DUMMY_TRANSACTIONS.map((tx) => (
              <Card 
                key={tx.id} 
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => setSelectedTx(tx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "receive" ? "bg-accent" : "bg-card"
                    }`}>
                      {tx.type === "receive" ? (
                        <ArrowDownLeft className="w-5 h-5 text-foreground" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {tx.type === "receive" ? "Received" : "Sent"} {tx.token}
                        </p>
                        {tx.status === "verified" && (
                          <CheckCircle2 className="w-4 h-4 text-foreground" />
                        )}
                        {tx.status === "flagged" && (
                          <AlertCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tx.address} • {tx.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className={`font-bold ${tx.type === "receive" ? "text-foreground" : "text-muted-foreground"}`}>
                      {tx.type === "receive" ? "+" : "-"}${tx.amount}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        tx.status === "verified" ? "border-foreground/20" : 
                        tx.status === "pending" ? "border-muted" : 
                        "border-destructive"
                      }`}
                    >
                      Score: {tx.complianceScore}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedTx && (
        <TransactionDetail 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)} 
        />
      )}
    </div>
  );
};

export default Wallet;
