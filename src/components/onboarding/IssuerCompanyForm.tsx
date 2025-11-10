import { useState } from "react";
import { CompanyProfile, loadIssuerState, saveIssuerState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface IssuerCompanyFormProps {
  onNext: () => void;
}

export const IssuerCompanyForm = ({ onNext }: IssuerCompanyFormProps) => {
  const st = loadIssuerState();
  const [form, setForm] = useState<CompanyProfile>({
    legalName: st.company?.legalName ?? "",
    country: st.company?.country ?? "",
    regNumber: st.company?.regNumber ?? "",
    website: st.company?.website ?? ""
  });

  function update<K extends keyof CompanyProfile>(k: K, v: CompanyProfile[K]) {
    setForm(p => ({ ...p, [k]: v }));
  }

  function submit() {
    if (!form.legalName || !form.country || !form.regNumber) {
      toast.error("Please fill all required fields");
      return;
    }
    saveIssuerState({ ...st, registered: true, company: form });
    toast.success("Company profile saved");
    onNext();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="legalName">Legal Name *</Label>
          <Input 
            id="legalName"
            value={form.legalName} 
            onChange={e => update("legalName", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input 
            id="country"
            value={form.country} 
            onChange={e => update("country", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="regNumber">Registration Number *</Label>
          <Input 
            id="regNumber"
            value={form.regNumber} 
            onChange={e => update("regNumber", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website"
            value={form.website ?? ""} 
            onChange={e => update("website", e.target.value)} 
          />
        </div>
        <Button onClick={submit} className="w-full">Save & Continue</Button>
      </CardContent>
    </Card>
  );
};
