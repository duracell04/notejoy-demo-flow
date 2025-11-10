export type MockNote = {
  id: number;
  notional: number;
  apr: number;
  basis: "ACT/360" | "30/360";
  periodDays: number;
  maturity: number;
};

export function getMockNotes(): MockNote[] {
  return [
    {
      id: 1,
      notional: 500000,
      apr: 0.085,
      basis: "ACT/360",
      periodDays: 30,
      maturity: Date.parse("2026-06-15")
    },
    {
      id: 2,
      notional: 250000,
      apr: 0.095,
      basis: "30/360",
      periodDays: 90,
      maturity: Date.parse("2025-12-31")
    },
    {
      id: 3,
      notional: 1000000,
      apr: 0.12,
      basis: "ACT/360",
      periodDays: 30,
      maturity: Date.parse("2027-03-01")
    }
  ];
}
