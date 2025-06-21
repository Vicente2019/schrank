export type Item = {
  _id: string;
  category?: string;
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
