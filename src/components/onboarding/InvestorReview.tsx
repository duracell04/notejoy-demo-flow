"use client";
import { loadInvestorState, saveInvestorState, resetInvestorState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function InvestorReview() {
  const st = loadInvestorState();
  const navigate = useNavigate();

  function complete() {
    if (st.kycStatus !== "approved") {
      alert("KYC must be approved before completing onboarding.");
      return;
    }
    if (!st.accredited || !st.riskAcknowledged) {
      alert("You must be accredited and acknowledge risks.");
      return;
    }
    
    const next = { ...st, kycCompleted: true };
    saveInvestorState(next);
    alert("KYC onboarding complete! You can now browse and invest in private debt instruments.");
    navigate("/market");
  }

  function reset() {
    if (confirm("Reset all investor KYC data?")) {
      resetInvestorState();
      window.location.reload();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Complete</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Profile:</span>
            <span className="text-sm text-muted-foreground">{st.profile?.fullName ?? "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Country:</span>
            <span className="text-sm text-muted-foreground">{st.profile?.country ?? "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">KYC Status:</span>
            <Badge variant={st.kycStatus === "approved" ? "default" : "outline"}>
              {st.kycStatus}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Accredited:</span>
            <Badge variant={st.accredited ? "default" : "outline"}>
              {st.accredited ? "Yes" : "No"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Risk Acknowledged:</span>
            <Badge variant={st.riskAcknowledged ? "default" : "outline"}>
              {st.riskAcknowledged ? "Yes" : "No"}
            </Badge>
          </div>
        </div>

        {st.kycStatus !== "approved" && (
          <p className="text-sm text-muted-foreground">
            ⚠️ KYC must be approved before completing onboarding. Use the mock approval button in step 2.
          </p>
        )}

        {(!st.accredited || !st.riskAcknowledged) && (
          <p className="text-sm text-muted-foreground">
            ⚠️ You must be accredited and acknowledge risks to invest in private debt.
          </p>
        )}

        <div className="flex gap-2">
          <Button onClick={complete} className="flex-1">
            Complete Onboarding
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
