export default async function handler(req: any, res: any) {
  const { id } = req.query;
  
  try {
    const response = await fetch(`https://mmolb.com/api/player/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
}