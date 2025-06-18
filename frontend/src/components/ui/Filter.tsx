import { useState } from "react";
import TextInput from "./TextInput";
import Tag from "../tags/Tag";
import TagsInput from "../tags/TagsInput";

type FilterProps = {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
};

export default function Filter({ selectedTags, onChange }: FilterProps) {

  return (
    <div className="bg-neutral-100 px-4 py-4 rounded-xl mb-4 space-y-3">
      <TagsInput
        label="Filter by tag"
        initialTags={selectedTags}
        onChange={onChange}
        placeholder="Type a tag and press Enter"
      />
    </div>
  );
}
