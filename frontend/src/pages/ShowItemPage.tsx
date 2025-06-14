import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../types/item";
import * as itemService from "../services/itemService";
import Container from "../components/ui/Container";

export default function ShowItemPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (id) {
      itemService.getItemById(id)
        .then((data) => setItem(data))
        .catch((err) => console.error(err))
    }
  }, [id]);

  if (!item) return <p className="text-center mt-4">Item not found.</p>;

  return (
    <Container className="py-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
      {item.image && (
        <img
          src={item.image.url}
          alt={item.name}
          className="w-full rounded-lg shadow-md object-cover mb-4"
        />
      )}
      <div className="space-y-2 text-gray-700">
        <p><strong>Category:</strong> {item.category}</p>
        {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}
        {item.size && <p><strong>Size:</strong> {item.size}</p>}
        {item.color && <p><strong>Color:</strong> {item.color}</p>}
        {item.price !== undefined && (
          <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
        )}
        {item.tags?.length > 0 && (
          <p><strong>Tags:</strong> {item.tags.map((tag) => `#${tag}`).join(" ")}</p>
        )}
      </div>
    </Container>
  );
}
