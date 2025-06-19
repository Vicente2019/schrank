import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "../types/item";
import * as itemService from "../services/itemService";
import Container from "../components/ui/Container";
import Tag from "../components/tags/Tag";

export default function ShowItemPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      itemService.getItemById(id)
        .then((data) => setItem(data))
        .catch((err) => console.error(err))
    }
  }, [id]);

  const handleDelete = () => id && itemService.deleteItem(id).then(() => navigate("/items")).catch(err => { console.error(err);});

  if (!item) return <p className="text-center mt-4">Item not found.</p>;

  return (
    <Container className="py-6 max-w-3xl grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div>
        {item.image && (
          <img
            src={item.image.url}
            alt={item.name}
            className="w-full rounded-lg shadow-md object-cover mb-4"
          />
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
        <div className="flex flex-wrap gap-2 mt-3">
          {item.tags.map((tag, index) => (
            <Tag tag={{value: tag, index: index}}/>
          ))}
        </div>
        <div className="space-y-2 text-gray-700 mt-4">
          <p><strong>Category:</strong> {item.category}</p>
          {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}
          {item.size && <p><strong>Size:</strong> {item.size}</p>}
          {item.color && <p><strong>Color:</strong> {item.color}</p>}
          {item.price !== undefined && (
            <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Delete Item
          </button>
        </div>
      </div>
    </Container>
  );
}
