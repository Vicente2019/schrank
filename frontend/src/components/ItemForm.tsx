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
    <form onSubmit={handleSubmit}>
      <div><label>Name: <input name="name" required value={formData.name} onChange={handleChange} /></label></div>
      <div>
        <label>Category: 
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>top</option>
            <option>bottom</option>
            <option>shoes</option>
            <option>accessory</option>
            <option>outerwear</option>
            <option>other</option>
          </select>
        </label>
      </div>
      <div><label>Color: <input name="color" value={formData.color} onChange={handleChange} /></label></div>
      <div><label>Image URL: <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} /></label></div>
      <div><label>Tags (comma-separated): <input name="tags" value={formData.tags} onChange={handleChange} /></label></div>
      <div><label>Price: <input name="price" type="number" value={formData.price} onChange={handleChange} /></label></div>
      <div>
        <label>Size:
          <select name="size" value={formData.size} onChange={handleChange}>
            <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
            <option>XXL</option><option>One Size</option><option>Custom</option><option>Unknown</option>
          </select>
        </label>
      </div>
      <div><label>Brand: <input name="brand" value={formData.brand} onChange={handleChange} /></label></div>
      <button type="submit">Add Item</button>
    </form>
  );
}
