import { useState } from "react";
import TextInput from "./TextInput";
import Tag from "./tags/Tag";

type FilterProps = {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
};

export default function Filter({ selectedTags, onChange }: FilterProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      if (!selectedTags.includes(inputValue.trim())) {
        onChange([...selectedTags, inputValue.trim()]);
      }
      setInputValue("");
    }
    if (e.key === "Backspace" && inputValue === "") {
      onChange(selectedTags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...selectedTags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <div className="bg-neutral-100 px-4 py-4 rounded-xl mb-4 space-y-3">
      <TextInput
        label="Add Tag Filter"
        name="tag-filter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag and press Enter"
      />
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag, index) => (
          <Tag key={index} tag={{ value: tag, index }} removeTag={removeTag} />
        ))}
      </div>
    </div>
  );
}
