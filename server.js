const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:1234" }));

// Dedicated photo route — resolves Google's redirect and returns the final image URL
app.get("/photo", async (req, res) => {
  try {
    const { name } = req.query;
    const metaRes = await fetch(
      `https://places.googleapis.com/v1/${name}/media?maxWidthPx=600&skipHttpRedirect=true&key=${process.env.GOOGLE_API_KEY}`
    );
    const meta = await metaRes.json();
    res.redirect(meta.photoUri);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch photo" });
  }
});

// Google Places API proxy for search & details
app.use(
  "/gapi",
  createProxyMiddleware({
    target: "https://places.googleapis.com",
    changeOrigin: true,
    pathRewrite: { "^/gapi": "" },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader("X-Goog-Api-Key", process.env.GOOGLE_API_KEY);
      },
    },
  })
);

app.listen(3000, () => console.log("Proxy running on http://localhost:3000"));
