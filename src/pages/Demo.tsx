import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Loader2,
  Shield,
  FileCheck,
  Wallet as WalletIcon
} from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "active" | "complete";
};

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const initialSteps: Step[] = [
    {
      id: 1,
      title: "Connect Wallet",
      description: "Simulate wallet connection and authentication",
      icon: <WalletIcon className="w-5 h-5" />,
      status: currentStep > 0 ? "complete" : currentStep === 0 ? "active" : "pending",
    },
    {
      id: 2,
      title: "Compliance Check",
      description: "Run automated compliance verification",
      icon: <Shield className="w-5 h-5" />,
      status: currentStep > 1 ? "complete" : currentStep === 1 ? "active" : "pending",
    },
    {
      id: 3,
      title: "Transaction Simulation",
      description: "Process a demo transaction with compliance tracking",
      icon: <FileCheck className="w-5 h-5" />,
      status: currentStep > 2 ? "complete" : currentStep === 2 ? "active" : "pending",
    },
  ];

  const handleNext = async () => {
    if (currentStep < initialSteps.length - 1) {
      setIsProcessing(true);
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(prev => prev + 1);
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsProcessing(false);
  };

  const steps = initialSteps.map((step, idx) => ({
    ...step,
    status: currentStep > idx ? "complete" : currentStep === idx ? "active" : "pending",
  })) as Step[];

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="mb-2">
              Interactive Demo
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black">
              Experience NoteX
            </h1>
            <p className="text-lg text-muted-foreground">
              Walk through a complete compliance workflow in seconds
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card
                key={step.id}
                className={`p-6 transition-all ${
                  step.status === "active"
                    ? "bg-accent/30 border-foreground/20"
                    : step.status === "complete"
                    ? "bg-card/50 border-border"
                    : "bg-card border-border opacity-60"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === "complete"
                        ? "bg-foreground text-background"
                        : step.status === "active"
                        ? "bg-accent"
                        : "bg-card"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : step.status === "active" ? (
                      step.icon
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      {step.status === "complete" && (
                        <Badge variant="outline" className="bg-foreground text-background">
                          Complete
                        </Badge>
                      )}
                      {step.status === "active" && isProcessing && (
                        <Badge variant="outline" className="gap-2">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Processing
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>

                    {/* Active Step Details */}
                    {step.status === "active" && !isProcessing && (
                      <div className="pt-4 space-y-4">
                        {index === 0 && (
                          <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                            <p className="text-sm font-semibold">Demo Wallet Address</p>
                            <p className="font-mono text-xs text-muted-foreground">
                              0x742d35Cc6634C0532925a3b844Bc9e7595f4a8f
                            </p>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="grid grid-cols-2 gap-3">
                            {["AML Screening", "Sanctions Check", "KYC Status", "Risk Assessment"].map(
                              (check) => (
                                <div
                                  key={check}
                                  className="p-3 rounded-lg bg-card border border-border flex items-center justify-between"
                                >
                                  <span className="text-sm">{check}</span>
                                  <CheckCircle2 className="w-4 h-4 text-foreground" />
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {index === 2 && (
                          <div className="p-4 rounded-lg bg-card border border-border space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Amount</span>
                              <span className="font-bold">$5,000.00 USDC</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Compliance Score</span>
                              <Badge variant="outline">98/100</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Status</span>
                              <Badge className="bg-foreground text-background">Verified</Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center pt-4">
            {currentStep < steps.length - 1 ? (
              <Button
                size="lg"
                onClick={handleNext}
                disabled={isProcessing}
                className="bg-ink text-paper hover:bg-ink/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleReset}
                variant="outline"
              >
                Start Over
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
