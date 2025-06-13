import { Outfit } from "../../types/outfit";

type Props = {
  outfit: Outfit;
};

export default function OutfitCard({ outfit }: Props) {
  return (
    <div className="border rounded-xl shadow-sm p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">{outfit.name}</h2>
      <div className="grid grid-cols-2 gap-2">
        {outfit.images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={img.filename || `Image ${idx + 1}`}
            className="rounded object-cover w-full h-32"
          />
        ))}
      </div>
    </div>
  );
}
