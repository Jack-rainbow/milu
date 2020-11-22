module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb", "@vue/typescript/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: ["error", "never"],
    "comma-dangle": 0,
    quotes: 0,
    "linebreak-style": 0,
    "arrow-body-style": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }]
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  }
};
