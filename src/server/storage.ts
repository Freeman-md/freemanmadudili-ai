import "server-only";

import { supabase } from "@/server/supabase";

export type SignedUpload = {
  signedUrl: string;
  path: string;
  token: string;
};

export async function createSignedUploadUrl({
  bucket,
  path,
}: {
  bucket: string;
  path: string;
}): Promise<SignedUpload> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create signed upload url.");
  }

  return {
    signedUrl: data.signedUrl,
    path: data.path,
    token: data.token,
  };
}

export async function uploadToSignedUrl({
  bucket,
  path,
  token,
  body,
  contentType,
}: {
  bucket: string;
  path: string;
  token: string;
  body: ArrayBuffer | Blob | Uint8Array;
  contentType?: string;
}) {
  const { data, error } = await supabase.storage.from(bucket).uploadToSignedUrl(path, token, body, {
    contentType,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getFileStream({
  bucket,
  path,
}: {
  bucket: string;
  path: string;
}) {
  const { data, error } = await supabase.storage.from(bucket).download(path);

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to download object.");
  }

  return data.stream();
}
