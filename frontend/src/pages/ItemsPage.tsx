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
    <Container className="py-6 grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="space-y-4">
        <button 
          className="rounded-2xl text-[#534d56] text-xl font-semibold bg-[#decdf5] hover:bg-[#c6b4e3] w-full py-2"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/items/new");
          }}>
          New Item
        </button>
        <Filter selectedTags={filterTags} onChange={setFilterTags} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 md:col-span-2 lg:col-span-3 gap-6">
        <ItemList 
          items={filterByTags(items, filterTags)} 
          onClick={handleItemClick}
        />
      </div>
    </Container>
  );
}
