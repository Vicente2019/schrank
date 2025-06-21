type Props = {
  removeTag?: (index: number) => void;
  className?: string;
  tag: {
    value: string,
    index: number,
  };
};

export default function Tag({ removeTag, className, tag }: Props) {
  return (
    <span
      key={tag.index}
      className={`bg-[#f8f1ff] text-blue-800 border border-[#decdf5] px-2 py-1 rounded-full text-sm flex items-center ${className ?? ""}`}
    >
      {tag.value}
    {
      removeTag && 
      <button
        type="button"
        onClick={() => removeTag(tag.index)}
        className="ml-1 text-red-500 hover:text-red-700 font-bold"
      >
        ×
      </button>
    }
  </span>
  );
}