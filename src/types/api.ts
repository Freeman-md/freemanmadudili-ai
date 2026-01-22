export type ApiError = {
  code: "bad_request" | "not_found" | "conflict" | "payload_too_large" | "error";
  message: string;
};

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };
