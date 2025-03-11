import { useEffect, useState } from "react";
import { GetPlaceDetails, GetPhotoUrl } from "@/service/GlobalApi";

export default function PlacePhoto({ query, fallback = "/placeholder.jpg" }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const results = await GetPlaceDetails(query);
        const photoRef = results[0]?.photos?.[0]?.photo_reference;
        setPhotoUrl(photoRef ? GetPhotoUrl(photoRef) : fallback);
      } catch (error) {
        setPhotoUrl(fallback);
      }
    };

    if (query) fetchPhoto();
  }, [query]);

  return (
    <img
      src={photoUrl || fallback}
      className="w-full h-full object-cover"
      onError={(e) => (e.target.src = fallback)}
      alt={query}
    />
  );
}
