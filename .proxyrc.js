module.exports = {
  "/dapi": {
    target: "https://www.swiggy.com",
    changeOrigin: true,
    headers: {
      "__fetch_req__": "true",
      "content-type": "application/json",
      "platform": "dweb",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
    },
  },
};
