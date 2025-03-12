import { useEffect, useState } from "react";
import { GetPlaceDetails, GetPhotoUrl } from "@/service/GlobalApi";

export default function PlacePhoto({ query, fallback = "/placeholder.jpg" }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchPhoto = async () => {
      try {
        const results = await GetPlaceDetails(query);
        if (!isMounted) return;

        if (!results || results.length === 0) {
          throw new Error("No results found");
        }

        const photoRef = results[0]?.photos?.[0]?.photo_reference;
        if (photoRef) {
          const url = GetPhotoUrl(photoRef);
          console.log("Photo URL:", url); // Debug log
          setPhotoUrl(url);
        } else {
          setPhotoUrl(fallback);
        }
      } catch (error) {
        console.error("Photo Error:", error.message);
        if (isMounted) setPhotoUrl(fallback);
      }
    };

    if (query) fetchPhoto();
    return () => {
      isMounted = false;
    };
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
