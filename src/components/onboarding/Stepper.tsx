import { Badge } from "@/components/ui/badge";

interface StepperProps {
  step: number;
  labels: string[];
}

const Stepper = ({ step, labels }: StepperProps) => {
  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      {labels.map((label, i) => {
        const idx = i + 1;
        const active = idx === step;
        const done = idx < step;
        
        return (
          <Badge 
            key={label} 
            variant={done ? "default" : active ? "outline" : "secondary"}
            className={
              done ? "border-primary" : 
              active ? "border-primary text-primary" : 
              ""
            }
          >
            {idx}. {label}
          </Badge>
        );
      })}
    </div>
  );
};

export default Stepper;
