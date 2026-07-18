import {
  Project,
  Expense,
  ExpenseDraft,
  ClientPayment,
  VendorPayment,
  DocumentFile,
} from "../types/models";

export type AppAction =
  | { type: "HYDRATE"; payload: { projects: Project[] } }
  | { type: "ADD_PROJECT"; payload: Project }
  | {
      type: "ADD_EXPENSE";
      payload: { draft: ExpenseDraft; document?: DocumentFile };
    }
  | {
      type: "UPDATE_EXPENSE";
      payload: { expenseId: string; patch: Partial<ExpenseDraft> };
    }
  | { type: "DELETE_EXPENSE"; payload: { expenseId: string } }
  | { type: "ADD_CLIENT_PAYMENT"; payload: ClientPayment }
  | { type: "ADD_VENDOR_PAYMENT"; payload: VendorPayment }
  | { type: "ADD_DOCUMENT"; payload: DocumentFile }
  | { type: "DELETE_DOCUMENT"; payload: { documentId: string } };

export type Expense_ = Expense; // re-export convenience for consumers
