import { useEffect, useState } from "react";
import { Outfit } from "../types/outfit";
import OutfitList from "../components/outfits/OutfitList";
import Container from "../components/ui/Container";
import * as outfitService from "../services/outfitService";
import { useNavigate } from "react-router-dom";

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const navigate = useNavigate();

  const refreshOutfits = () => outfitService.getOutfits().then(setOutfits).catch(console.error);

  useEffect(() => {
    refreshOutfits();
  }, []);

  const handleOutfitClick = (outfit: Outfit) => {
    navigate(`/outfits/${outfit._id}`);
  };

  return (
    <Container className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <OutfitList 
          outfits={outfits} 
          refreshOutfits={refreshOutfits} 
          onClick={handleOutfitClick}
        />
      </div>
    </Container>
  );
}