import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Outfit } from "../types/outfit";
import * as outfitService from "../services/outfitService";
import Container from "../components/ui/Container";

export default function ShowOutfitPage() {
  const { id } = useParams<{ id: string }>();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      outfitService.getOutfitById(id)
        .then((data) => setOutfit(data))
        .catch(() => setError("Outfit not found or failed to load."));
    }
  }, [id]);

  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;
  if (!outfit) return <p className="text-center mt-4">Loading outfit...</p>;

  return (
    <Container className="py-6 max-w-4xl">
      {outfit.name && <h1 className="text-3xl font-bold mb-4">{outfit.name}</h1>}
      
      {outfit.images?.length > 0 && (
        <div className="mb-6 flex space-x-4 overflow-x-auto">
          {outfit.images.map((img) => (
            <img
              key={img.filename}
              src={img.url}
              alt={img.filename}
              className="h-40 rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      {outfit.notes && (
        <p className="mb-6 text-gray-700 whitespace-pre-wrap">{outfit.notes}</p>
      )}

      {outfit.items?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Items in this Outfit</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {outfit.items.map((item) => (
              <div key={item._id} className="border rounded-md p-2">
                {item.image ? (
                  <img
                    src={item.image.url}
                    className="h-32 w-full object-cover rounded"
                  />
                ) : (
                  <div className="h-32 w-full bg-gray-200 flex items-center justify-center rounded text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
