export default async function handler(req, res) {
  const { query, photoreference } = req.query;
  
  try {
    const url = query 
      ? `https://maps.googleapis.com/maps/api/place/textsearch/json`
      : `https://maps.googleapis.com/maps/api/place/photo`;

    const params = new URLSearchParams({
      ...(query && { query }),
      ...(photoreference && { photoreference, maxwidth: 600 }),
      key: process.env.VITE_GOOGLE_PLACE_API_KEY,
      language: "en"
    });

    const response = await fetch(`${url}?${params}`);
    
    if (photoreference) {
      res.redirect(response.url);
    } else {
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "API call failed" });
  }
}
