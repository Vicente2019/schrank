import { Item } from "../../types/item";

type Props = {
  item: Item;
  onClick?: (item: Item) => void;
  selected?: boolean;
};

export default function ItemCard({ 
  item,  
  onClick, 
  selected, 
}: Props) {

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
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#f8f1ff] text-blue-800 border border-[#decdf5] text-xs px-2 py-1 rounded-full bg-opacity-80"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
