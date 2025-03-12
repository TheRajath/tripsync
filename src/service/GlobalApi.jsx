import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? "/api/google-proxy"
  : "/api/maps/api/place/textsearch/json";
const PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";
const placeCache = new Map();

export const GetPlaceDetails = async (query) => {
  const cacheKey = query.toLowerCase().trim();

  // if (placeCache.has(cacheKey)) return placeCache.get(cacheKey);

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query: cacheKey,
        key: import.meta.env.PROD
          ? undefined // Key handled by proxy
          : import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        language: "en",
      },
    });

    console.log("API Response:", response.data); // Debug log

    if (response.data.status !== "OK") {
      console.error("API Error:", response.data);
      return [];
    }

    // placeCache.set(cacheKey, response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Request Failed:", {
      url: error.config?.url,
      error: error.response?.data || error.message,
    });
    return [];
  }
};

export const GetPhotoUrl = (photoReference) => {
  if (!photoReference) return null;
  return import.meta.env.PROD
    ? `/api/google-proxy?photoreference=${photoReference}`
    : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${photoReference}&key=${
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY
      }`;
};
