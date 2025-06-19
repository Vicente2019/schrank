import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "../types/item";
import * as itemService from "../services/itemService";
import Container from "../components/ui/Container";
import ItemDetails from "../components/items/ItemDetails";

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
      <ItemDetails item={item} onDelete={handleDelete}/>
    </Container>
  );
}
