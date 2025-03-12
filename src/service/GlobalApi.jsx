import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? "/api/google-proxy"
  : "/api/maps/api/place/textsearch/json";

export const GetPlaceDetails = async (query) => {
  const cacheKey = query.toLowerCase().trim();


  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query: cacheKey,
        key: import.meta.env.PROD
          ? undefined
          : import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        language: "en",
      },
    });

    if (response.data.status !== "OK") {
      console.error("API Error:", response.data);
      return [];
    }

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
