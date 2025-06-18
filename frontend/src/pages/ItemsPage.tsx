// pages/ItemsPage.tsx
import { useEffect, useState } from "react";
import ItemList from "../components/items/ItemList";
import { Item } from "../types/item";
import Container from "../components/ui/Container";
import * as itemService from "../services/itemService";
import { useNavigate } from "react-router-dom";
import Filter from "../components/ui/Filter";
import { filterByTags } from "../utils/filters";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const refreshItems = () => itemService.getItems().then(setItems).catch(console.error);

  useEffect(() => {
    refreshItems();
  }, []);

  const handleItemClick = (item: Item) => {
    navigate(`/items/${item._id}`);
  };

  return (
    <Container className="py-6 grid lg:grid-cols-5 gap-6">
      <div className="space-y-4">
        <button 
          className="text-[#534d56] text-xl font-semibold bg-[#decdf5]"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/items/new");
          }}>
          New Item
        </button>
        <Filter selectedTags={filterTags} onChange={setFilterTags} />
      </div>
      <ItemList 
        items={filterByTags(items, filterTags)} 
        onClick={handleItemClick}
      />
    </Container>
  );
}
