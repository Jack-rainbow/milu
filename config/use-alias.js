const { src, root } = require("./utils");

module.exports = config => {
  config.resolve.alias
    .set("@", root("src"))
    .set("api", root("src/api"))
    .set("assets", root("src/assets"))
    .set("components", root("src/components"))
    .set("@v", root("src/views"))
    .set("@s", root("src/store"))
    .set("utils", src("utils"));
};
