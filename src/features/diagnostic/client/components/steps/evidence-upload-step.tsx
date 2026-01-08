"use client";

import { Dropzone } from "@/components/ui/dropzone";
import { evidenceTypes } from "@/features/diagnostic/client/data/evidence-types";

export function EvidenceUploadStep() {
  return (
    <div className="grid gap-6">
      <Dropzone />

      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Supported evidence
        </p>
        <div className="flex flex-wrap gap-3">
          {evidenceTypes.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-full bg-muted px-4 py-2 text-sm text-foreground"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
