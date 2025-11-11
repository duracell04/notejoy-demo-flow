export type CompanyProfile = {
  legalName: string;
  country: string;
  regNumber: string;
  website?: string;
};

export type AuditStatus = "not_started" | "submitted" | "approved" | "rejected";

export type InstrumentDraft = {
  name: string;
  notional: number;
  apr: number;
  periodDays: number;
  basis: "ACT/360" | "30/360";
  maturityISO: string;
};

export type IssuerState = {
  registered: boolean;
  company?: CompanyProfile;
  audit: AuditStatus;
  instruments: InstrumentDraft[];
  listedIds: number[];
};

const KEY = "notex_issuer_state_v1";

export function loadIssuerState(): IssuerState {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    if (!raw) return { registered: false, audit: "not_started", instruments: [], listedIds: [] };
    const v = JSON.parse(raw) as IssuerState;
    return { 
      registered: !!v.registered, 
      company: v.company, 
      audit: v.audit ?? "not_started", 
      instruments: v.instruments ?? [], 
      listedIds: v.listedIds ?? [] 
    };
  } catch {
    return { registered: false, audit: "not_started", instruments: [], listedIds: [] };
  }
}

export function saveIssuerState(next: IssuerState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
}

export function resetIssuerState() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

// Investor KYC state
export type InvestorProfile = {
  fullName: string;
  country: string;
  dateOfBirth: string;
  taxId?: string;
};

export type KYCStatus = "not_started" | "submitted" | "approved" | "rejected";

export type InvestorState = {
  kycCompleted: boolean;
  profile?: InvestorProfile;
  kycStatus: KYCStatus;
  accredited: boolean;
  riskAcknowledged: boolean;
};

const INVESTOR_KEY = "notex_investor_state_v1";

export function loadInvestorState(): InvestorState {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(INVESTOR_KEY) : null;
    if (!raw) return { kycCompleted: false, kycStatus: "not_started", accredited: false, riskAcknowledged: false };
    const v = JSON.parse(raw) as InvestorState;
    return { 
      kycCompleted: !!v.kycCompleted, 
      profile: v.profile, 
      kycStatus: v.kycStatus ?? "not_started", 
      accredited: !!v.accredited,
      riskAcknowledged: !!v.riskAcknowledged
    };
  } catch {
    return { kycCompleted: false, kycStatus: "not_started", accredited: false, riskAcknowledged: false };
  }
}

export function saveInvestorState(next: InvestorState) {
  if (typeof window !== "undefined") localStorage.setItem(INVESTOR_KEY, JSON.stringify(next));
}

export function resetInvestorState() {
  if (typeof window !== "undefined") localStorage.removeItem(INVESTOR_KEY);
}
