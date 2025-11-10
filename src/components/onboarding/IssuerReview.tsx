import { loadIssuerState, resetIssuerState } from "@/lib/onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface IssuerReviewProps {
  onFinish: () => void;
}

export const IssuerReview = ({ onFinish }: IssuerReviewProps) => {
  const st = loadIssuerState();

  function handleReset() {
    resetIssuerState();
    toast.info("Onboarding reset");
    window.location.reload();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Badge>Company: {st.company?.legalName ?? "-"}</Badge>
          <Badge variant={st.audit === "approved" ? "default" : "secondary"}>
            Audit: {st.audit}
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Instruments Ready to List</h4>
          {st.instruments.length === 0 && (
            <p className="text-sm text-muted-foreground">No drafts yet.</p>
          )}
          {st.instruments.map((d, i) => (
            <Card key={i} className="p-4">
              <p className="font-semibold mb-2">{d.name}</p>
              <div className="flex gap-2 flex-wrap text-xs">
                <Badge variant="outline">Notional: {d.notional.toLocaleString()}</Badge>
                <Badge variant="outline">APR: {(d.apr * 100).toFixed(2)}%</Badge>
                <Badge variant="outline">Period: {d.periodDays}d</Badge>
                <Badge variant="outline">Basis: {d.basis}</Badge>
                <Badge variant="outline">Maturity: {d.maturityISO}</Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={onFinish} className="flex-1">Finish Onboarding</Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>
      </CardContent>
    </Card>
  );
};
