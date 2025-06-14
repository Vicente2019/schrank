import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../types/item";
import Container from "../components/ui/Container";
import ItemList from "../components/items/ItemList";
import TextInput from "../components/ui/TextInput";
import * as itemService from "../services/itemService";
import * as outfitService from "../services/outfitService";

export default function NewOutfitPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const refreshItems = () => itemService.getItems().then(setItems).catch(console.error);

  useEffect(() => {
    refreshItems();
  }, []);

  const handleToggleSelect = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    outfitService.createOutfit({ name, notes, items: selectedItemIds })
      .then(() => navigate("/outfits"))
      .catch(() => setError("Failed to create outfit."));
  };

  return (
    <Container className="py-6">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Outfit</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput 
            label="Outfit Name"
            name="outfitName" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <TextInput 
            label="Notes (optional)"
            name="notes" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

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
