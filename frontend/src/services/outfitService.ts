import { Outfit } from "../types/outfit";

const BASE_URL = "http://localhost:5050/api/outfits";

export const getOutfits = async (): Promise<Outfit[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch outfits");
  return res.json();
};

export const createOutfit = async (data: {
  name: string;
  notes: string;
  items: string[];
}): Promise<Outfit> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create outfit");
  return res.json();
};

export const getOutfitById = async (id: string): Promise<Outfit> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch outfit");
  return res.json();
};
