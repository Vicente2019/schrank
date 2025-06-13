import { Outfit } from "../../types/outfit";
import OutfitCard from "./Outfit";

type Props = {
  outfits: Outfit[];
  refreshOutfits: () => void;
};

export default function OutfitList({ outfits, refreshOutfits }: Props) {
  return (
    <>
      {outfits.map((outfit) => (
        <OutfitCard key={outfit._id} outfit={outfit} />
      ))}
    </>
  );
}
