import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMockPipeline, PipelineStage } from "@/mocks/servicer";

const stageVariants: Record<PipelineStage, "default" | "secondary" | "outline"> = {
  pending: "outline",
  kyb_review: "secondary",
  approved: "default",
  listed: "default",
  servicing: "default"
};

const stageLabels: Record<PipelineStage, string> = {
  pending: "Pending",
  kyb_review: "KYB Review",
  approved: "Approved",
  listed: "Listed",
  servicing: "Servicing"
};

export function PipelineTable() {
  const pipeline = getMockPipeline();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issuer Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issuer</TableHead>
              <TableHead>Instrument</TableHead>
              <TableHead>Notional</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pipeline.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.issuer}</TableCell>
                <TableCell>{item.instrument}</TableCell>
                <TableCell>${item.notional.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={stageVariants[item.stage]}>
                    {stageLabels[item.stage]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(item.submittedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(item.lastUpdate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
