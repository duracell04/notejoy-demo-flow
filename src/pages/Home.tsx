import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, FileCheck, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            Web3 Compliance Made Simple
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Crypto Compliance
            <br />
            <span className="text-muted-foreground">Simplified</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track, verify, and demonstrate compliance for every token transfer. 
            Enterprise-grade compliance tooling for the modern Web3 era.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-ink text-paper hover:bg-ink/90"
              onClick={() => navigate('/wallet')}
            >
              View Demo Wallet
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/demo')}
            >
              Try Demo Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Compliance First</h3>
            <p className="text-muted-foreground">
              Automated compliance checks for every transaction. Stay ahead of regulations.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Audit Ready</h3>
            <p className="text-muted-foreground">
              Complete transaction history with compliance metadata for instant audits.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Monitor token flows with live compliance status updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
