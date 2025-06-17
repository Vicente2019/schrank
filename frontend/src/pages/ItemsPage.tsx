// pages/ItemsPage.tsx
import { useEffect, useState } from "react";
import ItemList from "../components/items/ItemList";
import { Item } from "../types/item";
import Container from "../components/ui/Container";
import * as itemService from "../services/itemService";
import { useNavigate } from "react-router-dom";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  const refreshItems = () => itemService.getItems().then(setItems).catch(console.error);

  useEffect(() => {
    refreshItems();
  }, []);

  const handleItemClick = (item: Item) => {
    navigate(`/items/${item._id}`);
  };

  return (
    <Container className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <button 
          className="text-blue-500 text-xl font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/items/new");
          }}>
          New Item
        </button>
        <ItemList 
          items={items} 
          onClick={handleItemClick}
        />
      </div>
    </Container>
  );
}
