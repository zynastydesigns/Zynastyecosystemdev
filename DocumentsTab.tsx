import React from "react";
import { Upload, FileImage, FileText, Download, Trash2 } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { theme } from "../../../theme";
import { formatDate } from "../../../utils/format";
import { UseProjectWorkspaceResult } from "../../../hooks/useProjectWorkspace";

function iconFor(mimeType: string) {
  if (mimeType.startsWith("image/")) return { icon: FileImage, tint: theme.color.gold, soft: theme.color.goldSoft };
  return { icon: FileText, tint: theme.color.navy, soft: theme.color.navySoft };
}

function formatSize(bytes: number) {
  if (bytes > 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  if (bytes > 1024) return (bytes / 1024).toFixed(0) + " KB";
  return bytes + " B";
}

export function DocumentsTab({ workspace }: { workspace: UseProjectWorkspaceResult }) {
  const { project, documents, actions } = workspace;
  if (!project) return null;

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold" style={{ color: theme.color.text }}>Documents</h3>
        <Button icon={<Upload size={15} />} variant="primary">Upload File</Button>
      </div>

      {documents.length === 0 ? (
        <div className="text-sm py-10 text-center" style={{ color: theme.color.textFaint }}>
          No documents yet. Bills attached to expenses will show up here automatically.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {documents.map((d) => {
            const cfg = iconFor(d.mimeType);
            const Icon = cfg.icon;
            return (
              <div key={d.id} className="rounded-xl border overflow-hidden hover:shadow-sm transition-shadow" style={{ borderColor: theme.color.border }}>
                <div className="h-24 flex items-center justify-center" style={{ backgroundColor: cfg.soft }}>
                  <Icon size={26} color={cfg.tint} />
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium truncate" style={{ color: theme.color.text }}>{d.name}</div>
                  <div className="flex items-center justify-between mt-1 text-xs" style={{ color: theme.color.textFaint }}>
                    <span>{formatDate(d.uploadedAt)}</span>
                    <span>{formatSize(d.sizeBytes)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href={d.url || "#"}
                      download={d.name}
                      className="flex-1 flex items-center justify-center gap-1 text-xs font-medium py-1.5 rounded-lg border"
                      style={{ borderColor: theme.color.border, color: theme.color.text }}
                    >
                      <Download size={12} /> Download
                    </a>
                    <button
                      onClick={() => actions.deleteDocument(d.id)}
                      className="p-1.5 rounded-lg border"
                      style={{ borderColor: theme.color.border }}
                      aria-label="Delete document"
                    >
                      <Trash2 size={12} style={{ color: theme.color.error }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
