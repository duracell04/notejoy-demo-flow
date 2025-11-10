import { useState } from "react";
import { loadIssuerState, saveIssuerState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface IssuerAuditCardProps {
  onNext: () => void;
}

export const IssuerAuditCard = ({ onNext }: IssuerAuditCardProps) => {
  const st = loadIssuerState();
  const [status, setStatus] = useState(st.audit);

  function submitAudit() {
    const next = { ...st, audit: "submitted" as const };
    saveIssuerState(next);
    setStatus("submitted");
    toast.info("Audit submitted (mock)");
  }

  function approveAudit() {
    const next = { ...st, audit: "approved" as const };
    saveIssuerState(next);
    setStatus("approved");
    toast.success("Audit approved (mock)");
  }

  function rejectAudit() {
    const next = { ...st, audit: "rejected" as const };
    saveIssuerState(next);
    setStatus("rejected");
    toast.error("Audit rejected (mock)");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYB / Audit</CardTitle>
        <CardDescription>
          Upload corporate documents and attestation (mock). In the demo, use the buttons below to simulate status.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant={status === "approved" ? "default" : "secondary"}>
            Status: {status}
          </Badge>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={submitAudit}>Submit Audit (mock)</Button>
          <Button variant="secondary" onClick={approveAudit}>Approve (mock)</Button>
          <Button variant="secondary" onClick={rejectAudit}>Reject (mock)</Button>
        </div>
        <Button onClick={onNext} variant="outline" className="w-full">Continue</Button>
      </CardContent>
    </Card>
  );
};
