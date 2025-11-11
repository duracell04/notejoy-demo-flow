import { useEffect, useState } from "react";
import Stepper from "@/components/onboarding/Stepper";
import { IssuerCompanyForm } from "@/components/onboarding/IssuerCompanyForm";
import { IssuerAuditCard } from "@/components/onboarding/IssuerAuditCard";
import { InstrumentForm } from "@/components/onboarding/InstrumentForm";
import { IssuerReview } from "@/components/onboarding/IssuerReview";
import { loadIssuerState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const IssuerOnboard = () => {
  const [step, setStep] = useState(1);
  const labels = ["Company", "KYB/Audit", "Instrument", "Review"];

  useEffect(() => {
    const st = loadIssuerState();
    if (st.registered && step < 2) setStep(2);
    if (st.audit === "approved" && step < 3) setStep(3);
  }, [step]);

  function handleFinish() {
    toast.success("Onboarding complete! Proceed to Market to list your instruments.");
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Issuer Onboarding</h1>
            <Badge variant="outline">Private Debt Tokenization</Badge>
            <p className="text-muted-foreground mt-2">
              Register your company, pass audit, then list fixed-income notes.
            </p>
          </div>

          <Stepper step={step} labels={labels} />

          {step === 1 && <IssuerCompanyForm onNext={() => setStep(2)} />}
          {step === 2 && <IssuerAuditCard onNext={() => setStep(3)} />}
          {step === 3 && <InstrumentForm onAdd={() => setStep(4)} />}
          {step === 4 && <IssuerReview onFinish={handleFinish} />}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why Onboarding?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Company verification (KYB)</li>
              <li>Audit/attestation (mock)</li>
              <li>Define instrument terms (coupon, basis, maturity)</li>
              <li>List tokens for investors</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default IssuerOnboard;
