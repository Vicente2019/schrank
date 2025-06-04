import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { Item } from "./types/item";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch items once on mount
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
    <div className="App">
      <ItemForm onAdd={handleAdd} />
      <h1>My Items</h1>
      {loading ? <p>Loading...</p> : <ItemList items={items} />}
    </div>
  );
}

export default App;
