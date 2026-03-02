import {
  GetPresetsResponseSchema,
  PatchPresetBodySchema,
  PatchPresetResponseSchema,
  PutActivePresetBodySchema,
  PutActivePresetResponseSchema,
  type GetPresetsResponse,
  type PatchPresetBody,
  type PatchPresetResponse,
  type PutActivePresetResponse,
} from "@fc/shared";

import { http } from "./http";

export async function getPresets(): Promise<GetPresetsResponse> {
  const res = await http.get("/presets");
  return GetPresetsResponseSchema.parse(res.data);
}

export async function patchPreset(
  presetId: string,
  body: PatchPresetBody
): Promise<PatchPresetResponse> {
  const parsedBody = PatchPresetBodySchema.parse(body);
  const res = await http.patch(`/presets/${presetId}`, parsedBody);
  return PatchPresetResponseSchema.parse(res.data);
}

export async function putActivePreset(
  activeReviewPresetId: string
): Promise<PutActivePresetResponse> {
  const parsedBody = PutActivePresetBodySchema.parse({ activeReviewPresetId });
  const res = await http.put("/presets/active", parsedBody);
  return PutActivePresetResponseSchema.parse(res.data);
}
