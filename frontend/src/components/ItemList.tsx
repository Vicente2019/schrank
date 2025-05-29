import { useEffect, useState } from "react";

type Item = {
  _id: string;
  name: string;
  category: string;
  color?: string;
  tags: string[];
};

export default function ItemList() {
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.category} {item.color && `(${item.color})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
