export type MockNote = {
  id: number;
  issuer: string;
  notional: number;
  couponRate: number; // annual coupon rate
  ytm: number; // yield to maturity
  price: number; // as % of par (100 = par)
  bid: number;
  ask: number;
  lastTraded: number;
  volume24h: number;
  rating: string;
  basis: "ACT/360" | "30/360";
  periodDays: number;
  maturity: number;
  issueDate: number;
};

export function getMockNotes(): MockNote[] {
  return [
    {
      id: 1,
      issuer: "TechCorp International Ltd.",
      notional: 500000,
      couponRate: 0.085,
      ytm: 0.082,
      price: 101.2,
      bid: 101.15,
      ask: 101.25,
      lastTraded: 101.18,
      volume24h: 45000,
      rating: "BBB+",
      basis: "ACT/360",
      periodDays: 30,
      maturity: Date.parse("2026-06-15"),
      issueDate: Date.parse("2024-06-15")
    },
    {
      id: 2,
      issuer: "Global Manufacturing SA",
      notional: 250000,
      couponRate: 0.095,
      ytm: 0.098,
      price: 98.5,
      bid: 98.45,
      ask: 98.55,
      lastTraded: 98.48,
      volume24h: 28000,
      rating: "BB",
      basis: "30/360",
      periodDays: 90,
      maturity: Date.parse("2025-12-31"),
      issueDate: Date.parse("2023-12-31")
    },
    {
      id: 3,
      issuer: "Renewable Energy Holdings",
      notional: 1000000,
      couponRate: 0.12,
      ytm: 0.115,
      price: 102.8,
      bid: 102.75,
      ask: 102.85,
      lastTraded: 102.78,
      volume24h: 125000,
      rating: "A-",
      basis: "ACT/360",
      periodDays: 30,
      maturity: Date.parse("2027-03-01"),
      issueDate: Date.parse("2024-03-01")
    },
    {
      id: 4,
      issuer: "Logistics Solutions Inc.",
      notional: 750000,
      couponRate: 0.078,
      ytm: 0.081,
      price: 99.2,
      bid: 99.15,
      ask: 99.25,
      lastTraded: 99.18,
      volume24h: 62000,
      rating: "BBB",
      basis: "ACT/360",
      periodDays: 30,
      maturity: Date.parse("2026-09-30"),
      issueDate: Date.parse("2024-09-30")
    },
    {
      id: 5,
      issuer: "Healthcare Ventures plc",
      notional: 350000,
      couponRate: 0.105,
      ytm: 0.108,
      price: 97.8,
      bid: 97.75,
      ask: 97.85,
      lastTraded: 97.79,
      volume24h: 31000,
      rating: "BB+",
      basis: "30/360",
      periodDays: 90,
      maturity: Date.parse("2026-12-15"),
      issueDate: Date.parse("2023-12-15")
    },
    {
      id: 6,
      issuer: "Financial Services Group",
      notional: 2000000,
      couponRate: 0.065,
      ytm: 0.062,
      price: 103.5,
      bid: 103.45,
      ask: 103.55,
      lastTraded: 103.48,
      volume24h: 185000,
      rating: "A",
      basis: "ACT/360",
      periodDays: 30,
      maturity: Date.parse("2028-06-30"),
      issueDate: Date.parse("2024-06-30")
    }
  ];
}
