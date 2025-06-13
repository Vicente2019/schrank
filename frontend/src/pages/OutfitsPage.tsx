import { useEffect, useState } from "react";
import { Outfit } from "../types/outfit";
import OutfitList from "../components/outfits/OutfitList";
import Container from "../components/ui/Container";

export default function OutfitsPage() {
    const [outfits, setOutfits] = useState<Outfit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5050/api/outfits")
          .then((res) => res.json())
          .then((data) => {
            setOutfits(data);
            setLoading(false);
          });
    }, []);

    const refreshOutfits = async () => {
    const res = await fetch("http://localhost:5050/api/items");
    const data = await res.json();
    setOutfits(data);
  };

  return (
    <Container className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (<p>Loading...</p>) : (
          <OutfitList outfits={outfits} refreshOutfits={refreshOutfits} />
        )}
      </div>
    </Container>
  );
}