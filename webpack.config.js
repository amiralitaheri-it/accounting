module.exports = {
  entry: "./src/js/app.js",
  mode: "development",
  output: {
    path: `${__dirname}/dist/js/`,
    filename: "app.js",
  },
  watch: true,
};
