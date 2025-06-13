import { Outfit } from "../../types/outfit";
import OutfitCard from "./Outfit";

type Props = {
  outfits: Outfit[];
  refreshOutfits: () => void;
};

export default function OutfitList({ outfits, refreshOutfits }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {outfits.map((outfit) => (
        <OutfitCard key={outfit._id} outfit={outfit} />
      ))}
    </div>
  );
}
