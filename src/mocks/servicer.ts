export type PipelineStage = "pending" | "kyb_review" | "approved" | "listed" | "servicing";

export type PipelineItem = {
  id: number;
  issuer: string;
  instrument: string;
  notional: number;
  stage: PipelineStage;
  submittedDate: string;
  lastUpdate: string;
};

export type TokenActivity = {
  tokenId: number;
  date: string;
  type: "buy" | "sell" | "transfer";
  amount: number;
  price: number;
  from: string;
  to: string;
};

export type CouponSchedule = {
  tokenId: number;
  instrument: string;
  paymentDate: string;
  amount: number;
  status: "upcoming" | "processing" | "paid" | "overdue";
  holders: number;
};

export type DvPLeg = {
  id: number;
  tokenId: number;
  instrument: string;
  fiatStatus: "pending" | "confirmed" | "matched";
  usdcStatus: "pending" | "confirmed" | "matched";
  settlementDate: string;
  amount: number;
};

export function getMockPipeline(): PipelineItem[] {
  return [
    {
      id: 1,
      issuer: "TechCorp Ltd",
      instrument: "Senior Secured Note 2025-1",
      notional: 500000,
      stage: "listed",
      submittedDate: "2025-01-05",
      lastUpdate: "2025-01-15"
    },
    {
      id: 2,
      issuer: "GreenEnergy Inc",
      instrument: "Subordinated Note 2025-A",
      notional: 250000,
      stage: "servicing",
      submittedDate: "2024-12-20",
      lastUpdate: "2025-01-10"
    },
    {
      id: 3,
      issuer: "RetailChain Co",
      instrument: "Working Capital Note 2025",
      notional: 750000,
      stage: "approved",
      submittedDate: "2025-01-08",
      lastUpdate: "2025-01-12"
    },
    {
      id: 4,
      issuer: "MedTech Solutions",
      instrument: "Bridge Loan Note 2025-B",
      notional: 1000000,
      stage: "kyb_review",
      submittedDate: "2025-01-10",
      lastUpdate: "2025-01-11"
    },
    {
      id: 5,
      issuer: "LogisticsPro AG",
      instrument: "Equipment Financing 2025",
      notional: 350000,
      stage: "pending",
      submittedDate: "2025-01-12",
      lastUpdate: "2025-01-12"
    }
  ];
}

export function getMockTokenActivity(): TokenActivity[] {
  return [
    {
      tokenId: 1001,
      date: "2025-01-11T14:30:00Z",
      type: "buy",
      amount: 50000,
      price: 98.5,
      from: "Market",
      to: "0x742d...89a3"
    },
    {
      tokenId: 1002,
      date: "2025-01-11T11:20:00Z",
      type: "sell",
      amount: 25000,
      price: 102.3,
      from: "0x931f...42de",
      to: "Market"
    },
    {
      tokenId: 1001,
      date: "2025-01-10T16:45:00Z",
      type: "transfer",
      amount: 100000,
      price: 100.0,
      from: "0x742d...89a3",
      to: "0x853b...12cd"
    },
    {
      tokenId: 1003,
      date: "2025-01-10T09:15:00Z",
      type: "buy",
      amount: 75000,
      price: 99.8,
      from: "Market",
      to: "0x634c...78ef"
    },
    {
      tokenId: 1002,
      date: "2025-01-09T13:00:00Z",
      type: "buy",
      amount: 150000,
      price: 101.5,
      from: "Market",
      to: "0x931f...42de"
    }
  ];
}

export function getMockCouponSchedule(): CouponSchedule[] {
  return [
    {
      tokenId: 1001,
      instrument: "Senior Secured Note 2025-1",
      paymentDate: "2025-02-01",
      amount: 5000,
      status: "upcoming",
      holders: 12
    },
    {
      tokenId: 1002,
      instrument: "Subordinated Note 2025-A",
      paymentDate: "2025-01-28",
      amount: 3200,
      status: "processing",
      holders: 8
    },
    {
      tokenId: 1003,
      instrument: "Working Capital Note 2025",
      paymentDate: "2025-01-15",
      amount: 7500,
      status: "paid",
      holders: 15
    },
    {
      tokenId: 1004,
      instrument: "Bridge Loan Note 2025-B",
      paymentDate: "2025-02-15",
      amount: 12000,
      status: "upcoming",
      holders: 22
    },
    {
      tokenId: 1005,
      instrument: "Equipment Financing 2025",
      paymentDate: "2025-01-05",
      amount: 4200,
      status: "overdue",
      holders: 6
    }
  ];
}

export function getMockDvPLegs(): DvPLeg[] {
  return [
    {
      id: 1,
      tokenId: 1002,
      instrument: "Subordinated Note 2025-A",
      fiatStatus: "confirmed",
      usdcStatus: "matched",
      settlementDate: "2025-01-28",
      amount: 3200
    },
    {
      id: 2,
      tokenId: 1001,
      instrument: "Senior Secured Note 2025-1",
      fiatStatus: "confirmed",
      usdcStatus: "pending",
      settlementDate: "2025-02-01",
      amount: 5000
    },
    {
      id: 3,
      tokenId: 1004,
      instrument: "Bridge Loan Note 2025-B",
      fiatStatus: "pending",
      usdcStatus: "pending",
      settlementDate: "2025-02-15",
      amount: 12000
    }
  ];
}
