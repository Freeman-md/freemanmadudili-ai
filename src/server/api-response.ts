import "server-only";

import { NextResponse } from "next/server";

import type { ApiError, ApiResponse } from "@/types/api";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  const payload: ApiResponse<T> = { ok: true, data };
  return NextResponse.json(payload, init);
}

export function jsonError(
  code: ApiError["code"],
  message: ApiError["message"],
  status = 400
) {
  const payload: ApiResponse<never> = { ok: false, error: { code, message } };
  return NextResponse.json(payload, { status });
}

export function errorCodeFromStatus(status: number): ApiError["code"] {
  switch (status) {
    case 400:
      return "bad_request";
    case 404:
      return "not_found";
    case 409:
      return "conflict";
    case 413:
      return "payload_too_large";
    default:
      return "error";
  }
}
