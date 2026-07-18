import { ClientPayment, VendorPayment } from "../types/models";
import { generateId } from "../utils/id";

export interface ClientPaymentDraft {
  projectId: string;
  milestone: string;
  amount: number;
  date: string;
  mode: ClientPayment["mode"];
  status?: ClientPayment["status"];
}

export function buildClientPayment(draft: ClientPaymentDraft): ClientPayment {
  return {
    id: generateId("pay"),
    projectId: draft.projectId,
    milestone: draft.milestone,
    amount: draft.amount,
    date: draft.date,
    mode: draft.mode,
    status: draft.status ?? "Received",
    createdAt: new Date().toISOString(),
  };
}

export interface VendorPaymentDraft {
  projectId: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  date: string;
  mode: VendorPayment["mode"];
}

export function buildVendorPayment(draft: VendorPaymentDraft): VendorPayment {
  return {
    id: generateId("vpay"),
    projectId: draft.projectId,
    vendorId: draft.vendorId,
    vendorName: draft.vendorName,
    amount: draft.amount,
    date: draft.date,
    mode: draft.mode,
    createdAt: new Date().toISOString(),
  };
}
