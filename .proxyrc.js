// Forward /gapi and /photo requests to the local Express proxy during development
module.exports = {
  "/gapi": {
    target: "http://localhost:3000",
    changeOrigin: true,
  },
  "/photo": {
    target: "http://localhost:3000",
    changeOrigin: true,
  },
};
