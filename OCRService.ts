import { ExtractedBillData, ExpenseInputMethod } from "../types/models";

/**
 * OCRService
 * ---------------------------------------------------------------------
 * Wraps whatever OCR/AI vision provider Beacon uses to read a bill.
 * `extractBillData` is the only export other modules should call —
 * swap the implementation for a real API without touching callers.
 *
 * Contract: extraction NEVER auto-saves anything. It only returns a
 * best-effort draft; the calling UI must always route through user
 * confirmation before persisting an expense.
 */

export async function extractBillData(
  _file: File | Blob | null,
  method: ExpenseInputMethod
): Promise<ExtractedBillData> {
  // Simulate processing latency of a real OCR/AI call.
  await new Promise((r) => setTimeout(r, 900));

  if (method === "manual") {
    return {
      vendorName: null,
      amount: null,
      date: null,
      invoiceNumber: null,
      category: null,
      description: null,
      confidence: 0,
    };
  }

  // Mock extraction result — replace with the real OCR/AI response shape.
  return {
    vendorName: "Ozone Hardware",
    amount: 12850,
    date: new Date().toISOString().slice(0, 10),
    invoiceNumber: "OZ-1187",
    category: "Hardware",
    description: "Soft Close Hinges",
    confidence: 0.92,
  };
}
