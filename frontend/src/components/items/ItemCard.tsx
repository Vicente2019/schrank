import { Item } from "../../types/item";
import Tag from "../tags/Tag";

type Props = {
  item: Item;
  onClick?: (item: Item) => void;
  selected?: boolean;
};

export default function ItemCard({ item,  onClick, selected }: Props) {

  return (
    <div
      onClick={() => onClick?.(item)}
      className={`relative rounded-xl overflow-hidden shadow-sm transition
        border-2 border-transparent hover:border-blue-600
        ${selected ? "ring-2 ring-blue-600" : ""}
        ${onClick ? "cursor-pointer" : ""}
        group
      `}
      style={{
        backgroundImage: `url(${item.image?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '16rem',
      }}
    >
      {item.tags?.length > 0 && (
        <div className="absolute bottom-2 right-2 flex flex-wrap justify-end gap-1 z-10">
          {item.tags.map((tag, index) => (
            <Tag key={index} tag={{ value: tag, index }} className="bg-opacity-80"/>
          ))}
        </div>
      )}
    </div>
  );
}
