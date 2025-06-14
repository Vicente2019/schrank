// pages/NewOutfitPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../types/item";
import Container from "../components/ui/Container";
import ItemList from "../components/items/ItemList";
import * as itemService from "../services/itemService";

export default function NewOutfitPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    itemService.getItems().then(setItems).catch(console.error);
  }, []);

  const handleToggleSelect = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOutfit = {
      name,
      notes,
      items: selectedItemIds,
    };

    const res = await fetch("http://localhost:5050/api/outfits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOutfit),
    });

    if (res.ok) {
      navigate("/outfits");
    } else {
      alert("Failed to create outfit.");
    }
  };

  return (
    <Container className="py-6">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Outfit</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Outfit Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition"
          disabled={selectedItemIds.length === 0}
        >
          Save Outfit
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Select Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ItemList
            items={items}
            onClick={(item) => handleToggleSelect(item._id)}
            selectedIds={selectedItemIds}
          />
        </div>
      </div>
    </Container>
  );
}
