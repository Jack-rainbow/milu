const path = require("path");
const root = p => path.resolve(__dirname, "..", p);
const src = p => path.resolve(__dirname, "../src", p);

module.exports = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  resolve: function(dir) {
    return path.join(__dirname, "../", dir);
  },
  src,
  root
};
