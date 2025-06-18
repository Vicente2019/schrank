type Props = {
  removeTag: (index: number) => void;
  tag: {
    value: string,
    index: number,
  };
};

export default function Tag({ removeTag, tag }: Props) {
  return (
    <span
      key={tag.index}
      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
    >
      {tag.value}
    <button
      type="button"
      onClick={() => removeTag(tag.index)}
      className="ml-1 text-red-500 hover:text-red-700 font-bold"
    >
      ×
    </button>
  </span>
  );
}