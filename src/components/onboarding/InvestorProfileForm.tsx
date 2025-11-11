"use client";
import { useState } from "react";
import { InvestorProfile, loadInvestorState, saveInvestorState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function InvestorProfileForm({ onNext }: { onNext: () => void }) {
  const st = loadInvestorState();
  const [form, setForm] = useState<InvestorProfile>({
    fullName: st.profile?.fullName ?? "",
    country: st.profile?.country ?? "",
    dateOfBirth: st.profile?.dateOfBirth ?? "",
    taxId: st.profile?.taxId ?? ""
  });

  function update<K extends keyof InvestorProfile>(k: K, v: InvestorProfile[K]) {
    setForm(p => ({ ...p, [k]: v }));
  }

  function submit() {
    if (!form.fullName || !form.country || !form.dateOfBirth) {
      alert("Please fill required fields.");
      return;
    }
    saveInvestorState({ ...st, kycCompleted: false, profile: form });
    onNext();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name*</Label>
          <Input 
            id="fullName"
            value={form.fullName} 
            onChange={e => update("fullName", e.target.value)} 
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country of Residence*</Label>
          <Input 
            id="country"
            value={form.country} 
            onChange={e => update("country", e.target.value)}
            placeholder="United States"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth*</Label>
          <Input 
            id="dob"
            type="date"
            value={form.dateOfBirth} 
            onChange={e => update("dateOfBirth", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxId">Tax ID / SSN (optional)</Label>
          <Input 
            id="taxId"
            value={form.taxId ?? ""} 
            onChange={e => update("taxId", e.target.value)}
            placeholder="XXX-XX-XXXX"
          />
        </div>
        <Button onClick={submit} className="w-full">Save & Continue</Button>
      </CardContent>
    </Card>
  );
}
