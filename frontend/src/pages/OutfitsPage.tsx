import { useEffect, useState } from "react";
import { Outfit } from "../types/outfit";

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
      <div>
        outfits
      </div>
    );
}