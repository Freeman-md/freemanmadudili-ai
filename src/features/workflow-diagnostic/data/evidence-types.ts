import {
  FileSpreadsheet,
  Image,
  MessageSquare,
  Database,
  FileText,
} from "lucide-react";

export const evidenceTypes = [
  { label: "Screenshots (PNG, JPG)", icon: Image },
  { label: "CSV files", icon: FileSpreadsheet },
  { label: "CRM exports", icon: Database },
  { label: "PDF files", icon: FileText },
  { label: "Email or WhatsApp views", icon: MessageSquare },
];
