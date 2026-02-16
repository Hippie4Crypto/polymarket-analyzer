export default async function handler(req, res) {
  const { path } = req.query;
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Cache for 60 seconds, serve stale for 5 minutes
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  
  try {
    const apiPath = Array.isArray(path) ? path.join('/') : path;
    const url = `https://gamma-api.polymarket.com/${apiPath}`;
    
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Gamma API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from Gamma API' });
  }
}

export const config = {
  runtime: 'edge',
};
