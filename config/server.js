const list = ["user", "MTSService"];
const proxy = list.reduce(
  (proxy, key) => ({
    ...proxy,
    [`/${key}/*`]: {
      target: "",
      changeOrigin: true,
      secure: false
    }
  }),
  {}
);

module.exports = config => {
  config.devServer = {
    proxy,
    disableHostCheck: true
  };
};
