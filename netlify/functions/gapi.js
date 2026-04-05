// Proxy all /gapi/* requests to Google Places API with the server-side API key
exports.handler = async (event) => {
  // Strip the netlify function prefix to get the actual Places API path
  const apiPath = event.path.replace("/.netlify/functions/gapi", "");
  const url = `https://places.googleapis.com${apiPath}`;

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
  };
  if (event.headers["x-goog-fieldmask"]) {
    headers["X-Goog-FieldMask"] = event.headers["x-goog-fieldmask"];
  }

  const response = await fetch(url, {
    method: event.httpMethod,
    headers,
    body: event.httpMethod === "POST" ? event.body : undefined,
  });

  const data = await response.json();
  return {
    statusCode: response.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};
