import { Item } from "../types/item";

const BASE_URL = "http://localhost:5050/api/items";

export const getItems = async (): Promise<Item[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
};

export const createItem = async (formData: FormData): Promise<Item> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
};

export const deleteItem = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
};
