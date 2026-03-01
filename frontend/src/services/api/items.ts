import {
  CreateItemBodySchema,
  GetItemDetailResponseSchema,
  GetItemsResponseSchema,
  PatchItemResponseSchema,
  PostItemResponseSchema,
  type CreateItemBody,
  type GetItemDetailResponse,
  type GetItemsResponse,
  type PatchItemResponse,
  type PostItemResponse,
  type UpdateItemBody,
} from "@fc/shared";

import { http } from "./http";

export async function postItem(body: CreateItemBody): Promise<PostItemResponse> {
  const parsedBody = CreateItemBodySchema.parse(body);
  const res = await http.post("/items", parsedBody);
  return PostItemResponseSchema.parse(res.data);
}

export async function getItems(): Promise<GetItemsResponse> {
  const res = await http.get("/items");
  return GetItemsResponseSchema.parse(res.data);
}

export async function getItemDetail(id: string): Promise<GetItemDetailResponse> {
  const res = await http.get(`/items/${id}`);
  return GetItemDetailResponseSchema.parse(res.data);
}

export async function patchItem(
  id: string,
  body: UpdateItemBody
): Promise<PatchItemResponse> {
  const res = await http.patch(`/items/${id}`, body);
  return PatchItemResponseSchema.parse(res.data);
}

export async function deleteItem(id: string): Promise<void> {
  await http.delete(`/items/${id}`);
}
