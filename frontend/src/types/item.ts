export type Item = {
  _id: string;
  name: string;
  category: string;
  color?: string;
  tags: string[];
  price?: number;
  size?: string;
  brand?: string;
  wearCount?: number;
  image?: {
    url: string;
    filename: string;
  };
};
