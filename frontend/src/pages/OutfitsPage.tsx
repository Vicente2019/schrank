import { useEffect, useState } from "react";
import { Outfit } from "../types/outfit";
import OutfitList from "../components/outfits/OutfitList";
import Container from "../components/ui/Container";
import * as outfitService from "../services/outfitService";

export default function OutfitsPage() {
    const [outfits, setOutfits] = useState<Outfit[]>([]);

    useEffect(() => {
      outfitService.getOutfits().then(setOutfits).catch(console.error);
    }, []);

  const refreshOutfits = () => outfitService.getOutfits().then(setOutfits).catch(console.error);

  return (
    <Container className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <OutfitList outfits={outfits} refreshOutfits={refreshOutfits} />
      </div>
    </Container>
  );
}