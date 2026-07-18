import { DocumentFile, DocumentCategory } from "../types/models";
import { generateId } from "../utils/id";

/**
 * DocumentService
 * ---------------------------------------------------------------------
 * Owns the shape of a stored file record. Actual byte storage is
 * delegated (object URL today, S3/GCS-backed URL once a real backend
 * exists) — nothing above this layer should know the difference.
 */

export function createDocumentRecord(params: {
  projectId: string;
  file: File | Blob;
  fileName: string;
  category: DocumentCategory;
  linkedExpenseId?: string;
}): DocumentFile {
  const url =
    typeof URL !== "undefined" && "createObjectURL" in URL
      ? URL.createObjectURL(params.file)
      : "";

  return {
    id: generateId("doc"),
    projectId: params.projectId,
    name: params.fileName,
    category: params.category,
    mimeType: params.file.type || "application/octet-stream",
    sizeBytes: params.file.size,
    url,
    linkedExpenseId: params.linkedExpenseId,
    uploadedAt: new Date().toISOString(),
  };
}

export function categoryForInputMethod(
  method: "gst_bill" | "non_gst_bill" | "scan"
): DocumentCategory {
  if (method === "gst_bill") return "GST Bill";
  if (method === "non_gst_bill") return "Non-GST Bill";
  return "Supporting File";
}
