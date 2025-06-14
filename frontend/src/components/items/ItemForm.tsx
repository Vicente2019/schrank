import React, { useState } from 'react';
import TextInput from '../../components/ui/TextInput';

type NewItem = {
  name: string;
  category: "top" | "bottom" | "shoes" | "accessory" | "outerwear" | "other";
  color?: string;
  tags: string;
  price?: string;
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "One Size" | "Custom" | "Unknown";
  brand?: string;
  imageFile?: File;
};

type Props = {
  refreshItems: () => void;
};

export default function ItemForm({ refreshItems }: Props) {
  const [formData, setFormData] = useState<NewItem>({
    name: '',
    category: 'top',
    color: '',
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

    const form = new FormData();
    form.append("name", formData.name);
    form.append("category", formData.category);
    if (formData.color) form.append("color", formData.color);
    form.append("tags", formData.tags);
    if (formData.price) form.append("price", formData.price);
    form.append("size", formData.size);
    if (formData.brand) form.append("brand", formData.brand);

    const fileInput = (e.currentTarget as HTMLFormElement).querySelector('input[name="image"]') as HTMLInputElement;
    if (fileInput?.files?.length === 1) {
      form.append("image", fileInput.files[0]);
    }

    try {
      const res = await fetch("http://localhost:5050/api/items", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to add item");

      setFormData({
        name: '',
        category: 'top',
        color: '',
        tags: '',
        price: '',
        size: 'Unknown',
        brand: '',
      });

      refreshItems();
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 space-y-4 w-full" encType="multipart/form-data">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="Name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
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
        <TextInput label="Color"
          name="color"
          value={formData.color ?? ''}
          onChange={handleChange}
        />
        <div>
          <input type="file" name="image" />
        </div>
        <TextInput
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
        />
        <TextInput
          label="Price"
          name="price"
          type="number"
          value={formData.price ?? '0'}
          onChange={handleChange}
        />
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
        <TextInput
          label="Brand"
          name="brand"
          value={formData.brand ?? ''}
          onChange={handleChange}
        />
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
