import { useState } from "react";
import { InstrumentDraft, loadIssuerState, saveIssuerState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface InstrumentFormProps {
  onAdd: () => void;
}

export const InstrumentForm = ({ onAdd }: InstrumentFormProps) => {
  const st = loadIssuerState();
  const [draft, setDraft] = useState<InstrumentDraft>({
    name: "Senior Secured Note 2025-1",
    notional: 100000,
    apr: 0.12,
    periodDays: 30,
    basis: "ACT/360",
    maturityISO: "2026-01-15"
  });

  function update<K extends keyof InstrumentDraft>(k: K, v: InstrumentDraft[K]) {
    setDraft(p => ({ ...p, [k]: v }));
  }

  function add() {
    if (!draft.name || !draft.notional || !draft.apr || !draft.periodDays || !draft.maturityISO) {
      toast.error("Please complete all fields");
      return;
    }
    const next = { ...st, instruments: [...st.instruments, draft] };
    saveIssuerState(next);
    toast.success("Instrument added");
    onAdd();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instrument Terms (Fixed-Income)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input 
            id="name"
            value={draft.name} 
            onChange={e => update("name", e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notional">Notional * (USDC)</Label>
          <Input 
            id="notional"
            type="number" 
            value={draft.notional} 
            onChange={e => update("notional", Number(e.target.value))} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apr">APR * (e.g., 0.12 for 12%)</Label>
          <Input 
            id="apr"
            type="number" 
            step="0.001"
            value={draft.apr} 
            onChange={e => update("apr", Number(e.target.value))} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="periodDays">Coupon Period (days) *</Label>
          <Input 
            id="periodDays"
            type="number" 
            value={draft.periodDays} 
            onChange={e => update("periodDays", Number(e.target.value))} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="basis">Basis *</Label>
          <Select value={draft.basis} onValueChange={(v) => update("basis", v as InstrumentDraft["basis"])}>
            <SelectTrigger id="basis">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACT/360">ACT/360</SelectItem>
              <SelectItem value="30/360">30/360</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maturity">Maturity (YYYY-MM-DD) *</Label>
          <Input 
            id="maturity"
            type="date"
            value={draft.maturityISO} 
            onChange={e => update("maturityISO", e.target.value)} 
          />
        </div>
        <Button onClick={add} className="w-full">Add Instrument</Button>
      </CardContent>
    </Card>
  );
};
