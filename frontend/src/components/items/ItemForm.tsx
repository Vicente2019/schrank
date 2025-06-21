import { useRef, useState } from "react";
import TextInput from "../ui/TextInput";
import TagsInput from "../tags/TagsInput";
import SelectInput from "../ui/SelectInput";
import { Item } from "../../types/item";
import { Category, isValidCategory, isValidSize, Size } from "../../utils/typeGuards";

type NewItem = {
  category: Category;
  price?: string;
  size: Size;
  brand?: string;
};

type Props = {
  initalData?: Partial<Item>;
  onSubmit: (form: FormData) => Promise<void>;
  submitLabel?: string;
}

export default function ItemForm({ 
  initalData, 
  onSubmit, 
  submitLabel="Save Item" }: Props
) {
  const [formData, setFormData] = useState<NewItem>({
    category: isValidCategory(initalData?.category) ? initalData!.category : "top",
    price: initalData?.price?.toString() ?? "",
    size: isValidSize(initalData?.size) ? initalData!.size : "Unknown",
    brand: initalData?.brand ?? "",
  });
  const [tags, setTags] = useState<string[]>(initalData?.tags ?? []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    if (formData.category) form.append("category", formData.category);
    if (formData.price) form.append("price", formData.price);
    if (formData.size) form.append("size", formData.size);
    if (formData.brand) form.append("brand", formData.brand);
    tags.forEach((tag) => form.append("tags", tag));

    if (fileInputRef.current?.files?.[0]) {
      form.append("image", fileInputRef.current.files[0]);
    }
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white space-y-4 w-full" encType="multipart/form-data">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={["top", "bottom", "shoes", "accessory", "outerwear", "other"]}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" name="image" ref={fileInputRef} accept="image/*" />
        </div>
        <TagsInput label="Tags" initialTags={tags} onChange={setTags} />
        <TextInput
          label="Price"
          name="price"
          type="number"
          value={formData.price ?? ""}
          onChange={handleChange}
        />
        <SelectInput
          label="Size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          options={["XS", "S", "M", "L", "XL", "XXL", "One Size", "Custom", "Unknown"]}
        />
        <TextInput label="Brand" name="brand" value={formData.brand ?? ""} onChange={handleChange} />
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
