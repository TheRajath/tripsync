export default async function handler(req, res) {
  const { query, photoreference } = req.query;
  
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

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
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    if (photoreference) {
      res.redirect(302, response.url);
    } else {
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).json({ 
      error: error.message,
      status: "PROXY_ERROR"
    });
  }
}