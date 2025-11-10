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
