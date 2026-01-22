"use client";

import { cn } from "@/lib/utils";
import type { QuestionField } from "@/types";
import type { DiagnosticFile } from "@/types";

type QuestionFieldRendererProps = {
  field: QuestionField;
  value: unknown;
  error?: string;
  uploadedFiles: DiagnosticFile[];
  onChange: (value: unknown) => void;
};

const inputClasses =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

const labelClasses = "text-sm font-semibold text-foreground";

export function QuestionFieldRenderer({
  field,
  value,
  error,
  uploadedFiles,
  onChange,
}: QuestionFieldRendererProps) {
  const fieldId = `field-${field.key}`;

  return (
    <div className="grid gap-2">
      <label htmlFor={fieldId} className={labelClasses}>
        {field.label}
      </label>
      {field.helpText ? (
        <p className="text-xs text-muted-foreground">{field.helpText}</p>
      ) : null}
      {renderInput(field, value, uploadedFiles, onChange, fieldId)}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function renderInput(
  field: QuestionField,
  value: unknown,
  uploadedFiles: DiagnosticFile[],
  onChange: (value: unknown) => void,
  fieldId: string
) {
  switch (field.inputType) {
    case "single_select":
      return (
        <select
          id={fieldId}
          className={inputClasses}
          value={(value as string) ?? ""}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Select one</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "multi_select":
      return (
        <div className="grid gap-2">
          {(field.options ?? []).map((option) => {
            const selectedValues = Array.isArray(value) ? value : [];
            const isChecked = selectedValues.includes(option.value);

            return (
              <label
                key={option.value}
                className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={isChecked}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onChange([...selectedValues, option.value]);
                    } else {
                      onChange(
                        selectedValues.filter(
                          (item) => item !== option.value
                        )
                      );
                    }
                  }}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      );
    case "boolean":
      return (
        <div className="flex gap-4">
          {["yes", "no"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <input
                type="radio"
                name={field.key}
                className="h-4 w-4 accent-primary"
                checked={value === (option === "yes")}
                onChange={() => onChange(option === "yes")}
              />
              {option === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
      );
    case "number":
      return (
        <input
          id={fieldId}
          type="number"
          className={inputClasses}
          value={typeof value === "number" && !Number.isNaN(value) ? value : ""}
          placeholder={field.placeholder}
          min={field.validation?.min}
          max={field.validation?.max}
          onChange={(event) => {
            const nextValue =
              event.target.value === "" ? undefined : event.target.valueAsNumber;
            onChange(nextValue);
          }}
        />
      );
    case "text":
    case "email":
    case "url":
    case "phone":
    case "date":
    case "time":
    case "datetime":
      return (
        <input
          id={fieldId}
          type={mapInputType(field.inputType)}
          className={inputClasses}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "textarea":
      return (
        <textarea
          id={fieldId}
          className={cn(inputClasses, "min-h-[120px] resize-none")}
          value={(value as string) ?? ""}
          maxLength={field.validation?.maxLength}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "rating":
      return (
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => {
            const ratingValue = index + 1;
            const isSelected = value === ratingValue;

            return (
              <button
                key={ratingValue}
                type="button"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground"
                )}
                onClick={() => onChange(ratingValue)}
              >
                {ratingValue}
              </button>
            );
          })}
        </div>
      );
    case "currency":
      return (
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <input
            id={fieldId}
            type="number"
            className={cn(inputClasses, "pl-6")}
            value={typeof value === "number" && !Number.isNaN(value) ? value : ""}
            min={field.validation?.min}
            max={field.validation?.max}
            onChange={(event) => {
              const nextValue =
                event.target.value === "" ? undefined : event.target.valueAsNumber;
              onChange(nextValue);
            }}
          />
        </div>
      );
    case "file_ref":
      return (
        <FileReferenceSelect
          field={field}
          uploadedFiles={uploadedFiles}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}

function FileReferenceSelect({
  field,
  uploadedFiles,
  value,
  onChange,
}: {
  field: QuestionField;
  uploadedFiles: DiagnosticFile[];
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const isMulti = Boolean(field.fileRef?.maxSelections && field.fileRef.maxSelections > 1);
  const options = filterFileOptions(uploadedFiles, field.fileRef?.allow);

  if (!options.length) {
    return (
      <div className="rounded-md border border-dashed border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
        Upload evidence to select a file.
      </div>
    );
  }

  if (isMulti) {
    const selected = Array.isArray(value) ? value : [];

    return (
      <select
        multiple
        className={inputClasses}
        value={selected as string[]}
        onChange={(event) => {
          const selectedValues = Array.from(event.target.selectedOptions).map(
            (option) => option.value
          );
          onChange(selectedValues);
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <select
      className={inputClasses}
      value={(value as string) ?? ""}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">Select file</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function filterFileOptions(
  uploadedFiles: DiagnosticFile[],
  allow?: "any" | "csv" | "image" | "pdf" | "email"
) {
  if (!allow || allow === "any") {
    return uploadedFiles.map((file) => ({
      label: file.name,
      value: file.id,
    }));
  }

  const allowedExtensions = {
    csv: ["CSV"],
    image: ["PNG", "JPG", "JPEG"],
    pdf: ["PDF"],
    email: ["EML", "MSG"],
  };

  const allowed = allowedExtensions[allow] ?? [];

  return uploadedFiles
    .filter((file) => allowed.includes(file.extension))
    .map((file) => ({
      label: file.name,
      value: file.id,
    }));
}

function mapInputType(type: QuestionField["inputType"]) {
  switch (type) {
    case "datetime":
      return "datetime-local";
    case "phone":
      return "tel";
    default:
      return type;
  }
}
