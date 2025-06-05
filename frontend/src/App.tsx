import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { Item } from "./types/item";

function App() {
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

  const handleAdd = async () => {
    const res = await fetch("http://localhost:5050/api/items");
    const data = await res.json();
    setItems(data);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 bg-white shadow rounded-xl p-6 border border-gray-200">
          <ItemForm onAdd={handleAdd} />
        </div>
        {loading ? <p>Loading...</p> : <ItemList items={items} />}
      </div>
    </div>
  );
}

export default App;
