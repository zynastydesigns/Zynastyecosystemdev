import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Field, TextInput, Select } from "../ui/FormControls";
import { ProjectDraft, ProjectType } from "../../types/models";

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (draft: ProjectDraft) => void;
}

const emptyDraft = (): ProjectDraft => ({
  name: "",
  client: "",
  city: "",
  type: "Residential",
  value: 0,
  startDate: new Date().toISOString().slice(0, 10),
  estCompletionDate: "",
});

export function NewProjectModal({ onClose, onCreate }: NewProjectModalProps) {
  const [draft, setDraft] = useState<ProjectDraft>(emptyDraft());
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.name || !draft.client || !draft.value) {
      setError("Project name, client, and value are required.");
      return;
    }
    onCreate(draft);
    onClose();
  };

  return (
    <Modal
      title="New Project"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={submit}>Create Project</Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Field label="Project Name">
          <TextInput value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Oceanview Residence" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client Name">
            <TextInput value={draft.client} onChange={(e) => set("client", e.target.value)} placeholder="Mr. Raman" />
          </Field>
          <Field label="City">
            <TextInput value={draft.city} onChange={(e) => set("city", e.target.value)} placeholder="Bangalore" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Project Type">
            <Select value={draft.type} onChange={(e) => set("type", e.target.value as ProjectType)}>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Renovation</option>
            </Select>
          </Field>
          <Field label="Project Value">
            <TextInput
              type="number"
              value={draft.value || ""}
              onChange={(e) => set("value", Number(e.target.value))}
              placeholder="₹ 0"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start Date">
            <TextInput type="date" value={draft.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </Field>
          <Field label="Est. Completion">
            <TextInput type="date" value={draft.estCompletionDate} onChange={(e) => set("estCompletionDate", e.target.value)} />
          </Field>
        </div>
      </div>
    </Modal>
  );
}
