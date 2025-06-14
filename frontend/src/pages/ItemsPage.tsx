// pages/ItemsPage.tsx
import { useEffect, useState } from "react";
import ItemList from "../components/items/ItemList";
import ItemFormCard from "../components/items/ItemFormCard";
import { Item } from "../types/item";
import Container from "../components/ui/Container";
import * as itemService from "../services/itemService";
import { useNavigate } from "react-router-dom";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    itemService.getItems().then(setItems).catch(console.error);
  }, []);

  const refreshItems = () => itemService.getItems().then(setItems).catch(console.error);

  const handleItemClick = (item: Item) => {
    navigate(`/items/${item._id}`);
  };

  return (
    <Container className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ItemFormCard refreshItems={refreshItems} />
        <ItemList 
          items={items} 
          refreshItems={refreshItems} 
          deleteEnabled={true}
          onClick={handleItemClick}
        />
      </div>
    </Container>
  );
}
