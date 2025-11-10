import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            Private Debt Tokenization
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Tokenize Private Debt
            <br />
            <span className="text-muted-foreground">Simply</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Register your company, pass audit, and list fixed-income notes with smart-contract coupons.
            Compliant, transparent, and institutional-grade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-ink text-paper hover:bg-ink/90"
              onClick={() => navigate('/issuer/onboard')}
            >
              Start Onboarding
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/market')}
            >
              Browse Market
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Company Registration</h3>
            <p className="text-muted-foreground">
              Register your company with KYB verification and audit attestation for compliance.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Fixed-Income Instruments</h3>
            <p className="text-muted-foreground">
              Configure debt instruments with smart-contract coupons, basis calculations, and maturity terms.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Compliant Trading</h3>
            <p className="text-muted-foreground">
              ERC-1404-style compliance checks with transparent reason codes and DvP servicing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
