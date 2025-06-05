import React, { useState } from 'react';

type NewItem = {
  name: string;
  category: "top" | "bottom" | "shoes" | "accessory" | "outerwear" | "other";
  color?: string;
  imageUrl?: string;
  tags: string;
  price?: string;
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "One Size" | "Custom" | "Unknown";
  brand?: string;
};

type Props = {
  onAdd: () => void;
};

export default function ItemForm({ onAdd }: Props) {
  const [formData, setFormData] = useState<NewItem>({
    name: '',
    category: 'top',
    color: '',
    imageUrl: '',
    tags: '',
    price: '',
    size: 'Unknown',
    brand: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("http://localhost:5050/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add item");

      setFormData({
        name: '',
        category: 'top',
        color: '',
        imageUrl: '',
        tags: '',
        price: '',
        size: 'Unknown',
        brand: '',
      });

      onAdd();
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2 bg-neutral-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 bg-neutral-50 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
          >
            <option>top</option>
            <option>bottom</option>
            <option>shoes</option>
            <option>accessory</option>
            <option>outerwear</option>
            <option>other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
          >
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
            <option>One Size</option>
            <option>Custom</option>
            <option>Unknown</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-neutral-50 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
