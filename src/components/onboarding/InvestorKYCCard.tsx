"use client";
import { loadInvestorState, saveInvestorState } from "@/lib/onboarding";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InvestorKYCCard({ onNext }: { onNext: () => void }) {
  const st = loadInvestorState();
  const [status, setStatus] = useState(st.kycStatus);

  function submitKYC() {
    const next = { ...st, kycStatus: "submitted" as const };
    saveInvestorState(next);
    setStatus("submitted");
  }

  function approveKYC() {
    const next = { ...st, kycStatus: "approved" as const };
    saveInvestorState(next);
    setStatus("approved");
  }

  function rejectKYC() {
    const next = { ...st, kycStatus: "rejected" as const };
    saveInvestorState(next);
    setStatus("rejected");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification (KYC)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant={status === "approved" ? "default" : "outline"}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload government-issued ID and proof of address (mock). In production, this would connect to an identity verification provider.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={submitKYC} size="sm">Submit KYC (mock)</Button>
          <Button onClick={approveKYC} variant="secondary" size="sm">Approve (mock)</Button>
          <Button onClick={rejectKYC} variant="secondary" size="sm">Reject (mock)</Button>
        </div>
        <Button onClick={onNext} className="w-full mt-4">Continue</Button>
      </CardContent>
    </Card>
  );
}
