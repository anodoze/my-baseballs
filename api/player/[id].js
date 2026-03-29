export default async function handler(request) {
  const id = request.url.split('/').pop();
  
  try {
    const response = await fetch(`https://mmolb.com/api/player/${id}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch player data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}