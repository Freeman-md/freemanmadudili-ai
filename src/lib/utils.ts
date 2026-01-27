import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TextItem } from "pdfjs-dist/types/src/display/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidSha256(value: string) {
  return /^[a-f0-9]{64}$/i.test(value);
}

export async function extractPdfText(buffer: Buffer) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(buffer),
  });
  const doc = await loadingTask.promise;
  const pageTexts: string[] = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const text = (content.items as TextItem[])
      .map((item) => item.str)
      .join(" ");
    if (text) {
      pageTexts.push(text);
    }
  }

  await doc.destroy();
  return pageTexts.join("\n").trim();
}
