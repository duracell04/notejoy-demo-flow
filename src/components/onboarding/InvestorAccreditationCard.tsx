"use client";
import { loadInvestorState, saveInvestorState } from "@/lib/onboarding";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function InvestorAccreditationCard({ onNext }: { onNext: () => void }) {
  const st = loadInvestorState();
  const [accredited, setAccredited] = useState(st.accredited);
  const [riskAck, setRiskAck] = useState(st.riskAcknowledged);

  function save() {
    const next = { ...st, accredited, riskAcknowledged: riskAck };
    saveInvestorState(next);
    onNext();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accreditation & Risk Acknowledgment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="accredited"
              checked={accredited}
              onCheckedChange={(checked) => setAccredited(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="accredited" className="cursor-pointer">
                I am an accredited investor
              </Label>
              <p className="text-xs text-muted-foreground">
                Private debt offerings typically require accredited investor status (net worth &gt; $1M or income &gt; $200K/year).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox 
              id="risk"
              checked={riskAck}
              onCheckedChange={(checked) => setRiskAck(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="risk" className="cursor-pointer">
                I understand the risks
              </Label>
              <p className="text-xs text-muted-foreground">
                Private debt investments carry risk including loss of principal, illiquidity, and credit risk.
              </p>
            </div>
          </div>
        </div>

        {accredited && riskAck && (
          <Badge variant="default" className="w-full justify-center">
            Eligible for private debt offerings
          </Badge>
        )}

        <Button onClick={save} className="w-full" disabled={!accredited || !riskAck}>
          Save & Continue
        </Button>
      </CardContent>
    </Card>
  );
}
