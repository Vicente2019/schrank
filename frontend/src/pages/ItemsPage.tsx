// pages/ItemsPage.tsx
import { useEffect, useState } from "react";
import ItemList from "../components/items/ItemList";
import ItemFormCard from "../components/items/ItemFormCard";
import { Item } from "../types/item";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5050/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const refreshItems = async () => {
    const res = await fetch("http://localhost:5050/api/items");
    const data = await res.json();
    setItems(data);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ItemFormCard refreshItems={refreshItems} />
        {loading ? <p>Loading...</p> : <ItemList items={items} refreshItems={refreshItems} />}
      </div>
    </div>
  );
}
