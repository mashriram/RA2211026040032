// frontend/pages/api/users.js
export default async function handler(req, res) {
    const backendUrl = 'http://localhost:3001/users';

    try{
        if (req.method === 'GET') {
            if (req.query.id) {
                // get the user using the ID
                const backendRes = await fetch(`${backendUrl}/${req.query.id}`);
                const data = await backendRes.json();
                res.status(200).json(data);
            }
            else{
                const backendRes = await fetch(backendUrl);
                const data = await backendRes.json();
                res.status(200).json(data);
            }
        }
    }
    catch (error){
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}