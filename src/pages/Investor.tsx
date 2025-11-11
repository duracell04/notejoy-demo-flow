"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { loadInvestorState } from "@/lib/onboarding";
import Stepper from "@/components/onboarding/Stepper";
import InvestorProfileForm from "@/components/onboarding/InvestorProfileForm";
import InvestorKYCCard from "@/components/onboarding/InvestorKYCCard";
import InvestorAccreditationCard from "@/components/onboarding/InvestorAccreditationCard";
import InvestorReview from "@/components/onboarding/InvestorReview";
import { useNavigate } from "react-router-dom";

const Investor = () => {
  const [step, setStep] = useState(1);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const st = loadInvestorState();
  const navigate = useNavigate();

  const labels = ["Profile", "KYC", "Accreditation", "Review"];

  useEffect(() => {
    // Auto-advance based on saved state
    if (st.profile && step < 2) setStep(2);
    if (st.kycStatus === "approved" && step < 3) setStep(3);
    if (st.accredited && st.riskAcknowledged && step < 4) setStep(4);
  }, [st, step]);

  if (!showOnboarding && !st.kycCompleted) {
    return (
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Investor</h1>
            <Badge variant="outline">Private Debt Investment Dashboard</Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>KYC Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To invest in private debt instruments, you must complete KYC (Know Your Customer) verification, 
                confirm accredited investor status, and acknowledge investment risks.
              </p>
              <Button onClick={() => setShowOnboarding(true)}>
                Start KYC Onboarding
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What you'll be able to do after KYC</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Browse available private debt instruments</li>
                <li>Check eligibility for specific offerings</li>
                <li>Track your holdings and coupon payments</li>
                <li>Monitor yield and maturity schedules</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (!st.kycCompleted) {
    return (
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Investor KYC</h1>
              <Badge variant="outline">Complete verification to access private debt markets</Badge>
            </div>

            <Stepper step={step} labels={labels} />

            {step === 1 && <InvestorProfileForm onNext={() => setStep(2)} />}
            {step === 2 && <InvestorKYCCard onNext={() => setStep(3)} />}
            {step === 3 && <InvestorAccreditationCard onNext={() => setStep(4)} />}
            {step === 4 && <InvestorReview />}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Why KYC?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Regulatory compliance (AML/CFT)</li>
                <li>Accredited investor verification</li>
                <li>Identity confirmation</li>
                <li>Risk disclosure acknowledgment</li>
                <li>Eligibility for private offerings</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // KYC completed - show investor dashboard
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Investor Dashboard</h1>
            <Badge variant="default">KYC Verified</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Name:</span>
              <span className="text-sm text-muted-foreground">{st.profile?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Country:</span>
              <span className="text-sm text-muted-foreground">{st.profile?.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Accredited:</span>
              <Badge variant="default">Yes</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No holdings yet. Browse the <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/market")}>Market</Button> to invest in private debt instruments.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No coupon payments scheduled. Your future coupon payments will appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Investor;
