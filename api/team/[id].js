// import type { VercelRequest, VercelResponse } from '@vercel/node';

// export default async function handler(req: VercelRequest, res:VercelResponse) {
//   const { id } = req.query;
  
//   try {
//     const response = await fetch(`https://mmolb.com/api/team/${id}`);
//     const data = await response.json();
//     res.json(data);
//     console.log("team", data)
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch team data' });
//   }
// }

export async function GET(request) {

  const url = new URL(request.url);

  const id = url.pathname.split('/').pop();


  try {

    const response = await fetch(`https://mmolb.com/api/team/${id}`);

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch team data' }, { status: 500 });
  }

}