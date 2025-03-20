// frontend/pages/api/posts.js
export default async function handler(req, res) {
    const backendUrl = 'http://localhost:3001/posts'; // URL of your NestJS backend
  
    try {
        const backendRes = await fetch(backendUrl);
        const data = await backendRes.json();
          if (req.method === 'GET') {
              if (req.query.id) {
                  // get the post using the ID
                  const backendRes = await fetch(`${backendUrl}/${req.query.id}`);
                  const data = await backendRes.json();
                  res.status(200).json(data);
              }
            res.status(200).json(data);
        }
  
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }