"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  type DiagnosticFile,
  useDiagnosticFlow,
} from "@/features/workflow-diagnostic/context/diagnostic-flow-context";
import { useDropzone } from "@/hooks/use-dropzone";

type DropzoneProps = {
  className?: string;
};

function UploadedFileItem({
  file,
  onRemove,
}: {
  file: DiagnosticFile;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm">
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{file.name}</span>
        <span className="text-xs text-muted-foreground">{file.extension}</span>
      </div>
      <button
        type="button"
        className="rounded-full p-1 text-muted-foreground transition hover:text-foreground"
        onClick={() => onRemove(file.id)}
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Dropzone({ className }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadedFiles, addFiles, removeFile } = useDiagnosticFlow();
  const {
    accept,
    isDragging,
    handleFiles,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  } = useDropzone({ onFilesAccepted: addFiles });

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("grid gap-4", className)}>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={Object.keys(accept).join(",")}
        multiple
        onChange={(event) => {
          if (event.target.files?.length) {
            handleFiles(event.target.files);
            event.target.value = "";
          }
        }}
      />

      <div
        role="button"
        tabIndex={0}
        className={cn(
          "flex min-h-[220px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 px-6 py-10 text-center transition",
          isDragging && "border-primary bg-primary/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        )}
        onClick={openFileDialog}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFileDialog();
          }
        }}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Upload className="h-6 w-6 text-primary" />
        <p className="mt-3 text-sm font-semibold text-foreground">
          Drag & drop files here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse
        </p>
      </div>

      {uploadedFiles.length ? (
        <div className="grid gap-3">
          {uploadedFiles.map((file) => (
            <UploadedFileItem
              key={file.id}
              file={file}
              onRemove={removeFile}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
