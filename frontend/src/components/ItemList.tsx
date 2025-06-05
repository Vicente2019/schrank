import { Item } from "../types/item";
import ItemCard from "./ItemCard";

type Props = {
  items: Item[];
};

export default function ItemList({ items }: Props) {
  return (
    <>
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </>
  );
}
