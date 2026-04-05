// Resolve a Google Places photo name → redirect to the final image URL
exports.handler = async (event) => {
  const { name } = event.queryStringParameters || {};
  if (!name) return { statusCode: 400, body: "Missing name parameter" };

  const metaRes = await fetch(
    `https://places.googleapis.com/v1/${name}/media?maxWidthPx=600&skipHttpRedirect=true&key=${process.env.GOOGLE_API_KEY}`
  );
  const meta = await metaRes.json();
  if (!meta.photoUri) return { statusCode: 500, body: "Photo not found" };

  return {
    statusCode: 302,
    headers: { Location: meta.photoUri },
    body: "",
  };
};
