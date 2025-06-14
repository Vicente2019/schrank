import { Outfit } from "../../types/outfit";
import OutfitCard from "./Outfit";

type Props = {
  outfits: Outfit[];
  refreshOutfits: () => void;
  onClick?: (outfit: Outfit) => void;
};

export default function OutfitList({ outfits, refreshOutfits, onClick }: Props) {
  return (
    <>
      {outfits.map((outfit) => (
        <OutfitCard key={outfit._id} outfit={outfit} onClick={onClick}/>
      ))}
    </>
  );
}
