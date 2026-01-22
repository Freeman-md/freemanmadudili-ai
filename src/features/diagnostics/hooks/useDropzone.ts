"use client";

import { useCallback, useMemo, useState, type DragEvent } from "react";

import type { DiagnosticFile } from "@/types";
import {
  ACCEPTED_EVIDENCE_EXTENSIONS,
  ACCEPTED_EVIDENCE_MIME_TYPES,
  EVIDENCE_ACCEPT,
} from "@/features/diagnostics/constants";

type UseDropzoneArgs = {
  onFilesAccepted: (files: DiagnosticFile[]) => void;
};

export function useDropzone({ onFilesAccepted }: UseDropzoneArgs) {
  const [isDragging, setIsDragging] = useState(false);

  const accept = useMemo(() => EVIDENCE_ACCEPT, []);

  const buildFileId = useCallback((file: File) => {
    return `${file.name}-${file.size}-${file.lastModified}`;
  }, []);

  const toDiagnosticFiles = useCallback((files: FileList | File[]) => {
    return Array.from(files)
      .filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
        return (
          ACCEPTED_EVIDENCE_EXTENSIONS.includes(extension) ||
          ACCEPTED_EVIDENCE_MIME_TYPES.includes(file.type)
        );
      })
      .map((file) => {
        const extension = file.name.split(".").pop()?.toUpperCase() ?? "FILE";

        return {
          id: buildFileId(file),
          name: file.name,
          extension,
          file,
        };
      });
  }, [buildFileId]);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const acceptedFiles = toDiagnosticFiles(files);
      if (acceptedFiles.length) {
        onFilesAccepted(acceptedFiles);
      }
    },
    [onFilesAccepted, toDiagnosticFiles]
  );

  const onDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer.files?.length) {
        handleFiles(event.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  return {
    accept,
    isDragging,
    handleFiles,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  };
}
