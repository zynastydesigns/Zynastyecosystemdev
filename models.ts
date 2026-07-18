/**
 * Beacon — Core Domain Models
 * Powered by Zynasty
 *
 * Single source of truth for shape of data across the app.
 * Keep these in sync with the backend/API contract once Beacon
 * moves off in-memory state.
 */

/* ------------------------------- enums ------------------------------- */

export type ProjectStatus =
  | "Design Phase"
  | "Procurement"
  | "In Progress"
  | "On Hold"
  | "Completed";

export type ProjectType = "Residential" | "Commercial" | "Renovation";

export type PaymentMode = "Bank Transfer" | "UPI" | "Cash" | "Cheque" | "Card";

export type ExpenseCategory =
  | "Plywood"
  | "Hardware"
  | "Laminate"
  | "Electrical"
  | "Plumbing"
  | "Paint"
  | "Transportation"
  | "Labour"
  | "Furniture"
  | "Other";

export type ExpenseInputMethod = "manual" | "gst_bill" | "non_gst_bill" | "scan";

export type ExpenseStatus = "Confirmed" | "Pending Review";

export type DocumentCategory =
  | "GST Bill"
  | "Non-GST Bill"
  | "Payment Receipt"
  | "Supporting File";

export type TimelineActivityType =
  | "expense_added"
  | "expense_updated"
  | "expense_deleted"
  | "client_payment_received"
  | "vendor_payment_completed"
  | "bill_uploaded"
  | "document_deleted"
  | "project_updated";

/* ------------------------------ entities ------------------------------ */

export interface Project {
  id: string; // e.g. ZYN-23012
  name: string;
  client: string;
  city: string;
  type: ProjectType;
  status: ProjectStatus;
  value: number; // total contracted project value
  received: number; // total client payments received — derived, kept denormalized for fast reads
  spent: number; // total expenses — derived, kept denormalized for fast reads
  startDate: string; // ISO date
  estCompletionDate: string; // ISO date
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
}

/** Fields that are safe for a caller to set when creating a project. */
export type ProjectDraft = Pick<
  Project,
  "name" | "client" | "city" | "type" | "value" | "startDate" | "estCompletionDate"
>;

export interface Vendor {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  gstin?: string;
  category?: string;
  source: "crm"; // Beacon never owns vendor data — always synced
}

/** Sentinel used when an expense has no CRM vendor (cash purchase). */
export const NO_VENDOR: Vendor = {
  id: "NO_VENDOR",
  name: "No Vendor / Cash Purchase",
  source: "crm",
};

export interface Expense {
  id: string;
  projectId: string;
  vendorId: string; // Vendor.id, or NO_VENDOR.id
  vendorName: string; // denormalized for display without a CRM round-trip
  category: ExpenseCategory;
  amount: number;
  date: string; // ISO date
  description: string;
  paymentMode: PaymentMode;
  notes?: string;
  billNumber?: string;
  inputMethod: ExpenseInputMethod;
  documentId?: string; // linked bill/receipt in DocumentService
  status: ExpenseStatus;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseDraft = Omit<
  Expense,
  "id" | "createdAt" | "updatedAt" | "status" | "vendorName"
> & { vendorName?: string };

export interface ClientPayment {
  id: string;
  projectId: string;
  milestone: string;
  amount: number;
  date: string;
  mode: PaymentMode;
  status: "Received" | "Overdue" | "Scheduled";
  createdAt: string;
}

export interface VendorPayment {
  id: string;
  projectId: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  date: string;
  mode: PaymentMode;
  createdAt: string;
}

export interface DocumentFile {
  id: string;
  projectId: string;
  name: string;
  category: DocumentCategory;
  mimeType: string;
  sizeBytes: number;
  url: string; // object URL / storage URL
  linkedExpenseId?: string;
  uploadedAt: string;
}

export interface TimelineActivity {
  id: string;
  projectId: string;
  type: TimelineActivityType;
  title: string;
  detail: string;
  amount?: number;
  createdAt: string;
}

/* --------------------------- OCR / AI extraction --------------------------- */

/** What the OCR/AI service returns from a scanned or uploaded bill. */
export interface ExtractedBillData {
  vendorName: string | null;
  amount: number | null;
  date: string | null;
  invoiceNumber: string | null;
  category: ExpenseCategory | null;
  description: string | null;
  confidence: number; // 0-1, surfaced in UI so users know what to double check
}

/* ------------------------------ derived/UI ------------------------------ */

export interface ProjectFinancials {
  value: number;
  received: number;
  spent: number;
  profit: number;
  pendingClientPayment: number;
  budgetUtilizationPercent: number; // spent / value
}

export interface DashboardStats {
  totalProjectValue: number;
  totalReceivables: number; // sum of pending client payments across all projects
  totalExpenses: number;
  totalPayables: number; // sum of overdue/unpaid vendor amounts
  currentProfit: number;
  activeProjects: number;
}

export interface CashFlowPoint {
  label: string;
  income: number;
  expenses: number;
  profit: number;
}
