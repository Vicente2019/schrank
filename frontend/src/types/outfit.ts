import { Item } from "./item";

export type Outfit = {
  _id: string;
  name: string;
  items: Item[];
  images: {
    url: string;
    filename: string;
  }[];
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
