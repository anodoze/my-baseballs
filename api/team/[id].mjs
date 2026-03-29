export default async function handler(request) {
  console.log("handler invoked", request.url);
  
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  const id = request.url.split('/').pop();

  try {

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`https://mmolb.com/api/team/${id}`, {
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Upstream error: ${response.status}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}