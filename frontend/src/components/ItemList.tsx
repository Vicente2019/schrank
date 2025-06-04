import { useEffect, useState } from "react";
import { Item } from "../types/item";

type Props = {
  items: Item[];
};

export default function ItemList({ items }: Props) {
  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} width={200} />
          )}
          <h2>{item.name}</h2>
          <p>Category: {item.category}</p>
          {item.brand && <p>Brand: {item.brand}</p>}
          {item.size && <p>Size: {item.size}</p>}
          {item.color && <p>Color: {item.color}</p>}
          {item.price !== undefined && <p>Price: ${item.price.toFixed(2)}</p>}
          {item.tags?.length > 0 && (
            <div>
              Tags:{" "}
              {item.tags.map((tag) => (
                <span key={tag}>#{tag} </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
