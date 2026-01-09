"use client";

import { useCallback, useMemo, useState, type DragEvent } from "react";

import type { DiagnosticFile } from "@/features/diagnostics/client/context/diagnostic-flow-context";

const acceptedExtensions = [
  "png",
  "jpg",
  "jpeg",
  "csv",
  "pdf",
  "xlsx",
  "xls",
  "eml",
  "msg",
];

const acceptedMimeTypes = [
  "image/png",
  "image/jpeg",
  "text/csv",
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "message/rfc822",
];

type UseDropzoneArgs = {
  onFilesAccepted: (files: DiagnosticFile[]) => void;
};

export function useDropzone({ onFilesAccepted }: UseDropzoneArgs) {
  const [isDragging, setIsDragging] = useState(false);

  const accept = useMemo(() => {
    return {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "message/rfc822": [".eml"],
      "application/vnd.ms-outlook": [".msg"],
    };
  }, []);

  const buildFileId = useCallback((file: File) => {
    return `${file.name}-${file.size}-${file.lastModified}`;
  }, []);

  const toDiagnosticFiles = useCallback((files: FileList | File[]) => {
    return Array.from(files)
      .filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
        return (
          acceptedExtensions.includes(extension) ||
          acceptedMimeTypes.includes(file.type)
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
