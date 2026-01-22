"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Trash2, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  useDiagnosticFlow,
} from "@/features/diagnostics/context";
import type { DiagnosticFile } from "@/types";
import { useDropzone } from "../hooks/useDropzone";


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
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm"
    >
      <div>
        <span className="font-medium text-foreground">{file.name}</span>
        <span className="ml-2 text-xs text-muted-foreground">
          {file.extension}
        </span>
      </div>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-red-500 opacity-60 transition hover:border-red-200 hover:bg-red-50 hover:opacity-100 group-hover:opacity-100"
        onClick={() => onRemove(file.id)}
        aria-label={`Remove ${file.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
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

      {uploadedFiles.length ? (
        <AnimatePresence>
          <motion.div layout className="grid gap-3">
            {uploadedFiles.map((file) => (
              <UploadedFileItem
                key={file.id}
                file={file}
                onRemove={removeFile}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : null}

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
    </div>
  );
}
