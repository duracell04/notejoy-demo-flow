import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

const Issuer = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Issuer</h1>
          <Badge variant="outline">Debt Tokenization Dashboard</Badge>
          <p className="text-muted-foreground mt-4">
            New issuer? Start with{" "}
            <NavLink to="/issuer/onboard" className="text-primary hover:underline font-medium">
              Onboarding
            </NavLink>{" "}
            to register your company and pass audit (mock).
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              As an issuer, you can tokenize your private debt instruments and list them on the NoteX platform. 
              The process involves company registration, audit approval, and instrument configuration.
            </p>
            <NavLink to="/issuer/onboard">
              <Button>Start Onboarding</Button>
            </NavLink>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What You Can Do</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Register your company with legal details</li>
              <li>Submit and track KYB/audit status</li>
              <li>Configure fixed-income instruments (APR, coupon terms, maturity)</li>
              <li>List approved instruments on the market</li>
              <li>Preview coupon calculations and servicing timelines</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Issuer;
