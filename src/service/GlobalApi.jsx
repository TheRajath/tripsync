import axios from "axios";

const BASE_URL = "/api/maps/api/place/textsearch/json";
const PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";
const placeCache = new Map();

export const GetPlaceDetails = async (query) => {
  const cacheKey = query.toLowerCase().trim();
  if (placeCache.has(cacheKey)) return placeCache.get(cacheKey);

  if (!import.meta.env.VITE_GOOGLE_PLACE_API_KEY) {
    console.error("Google Places API key is missing");
    return [];
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query: cacheKey,
        key: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        language: "en",
      },
    });

    if (response.data.status !== "OK") {
      console.error("API Error Status:", response.data.status);
      return [];
    }

    placeCache.set(cacheKey, response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Full Error Details:", {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response?.data,
    });
    return [];
  }
};

export const GetPhotoUrl = (photoReference) => {
  if (!photoReference) return null;
  return `${PHOTO_URL}?maxwidth=600&photoreference=${photoReference}&key=${
    import.meta.env.VITE_GOOGLE_PLACE_API_KEY
  }`;
};
