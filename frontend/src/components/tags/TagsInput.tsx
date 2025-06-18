import { useState } from "react";
import Tag from "./Tag";

type Props = {
  label: string;
  initialTags?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
};

export default function TagsInput({
  label,
  initialTags = [],
  onChange,
  placeholder = "Add tag and press Enter",
}: Props) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onChange?.(updatedTags);
    }
    setTagInput("");
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onChange?.(updatedTags);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          { label }
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag removeTag={removeTag} tag={{value: tag, index: index}}/>
          ))}
        </div>
      </div>

      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md border border-gray-300 bg-neutral-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}
