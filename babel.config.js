module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }],
    [
      "import",
      {
        libraryName: "@ant-design/icons-vue",
        libraryDirectory: "es/icons",
        camel2DashComponentName: false,
      },
      "ant-design-icons",
    ],
  ],
}
