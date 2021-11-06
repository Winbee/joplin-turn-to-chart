module.exports = {
  test: [
    // We need to compile d3 (and d3-*) for jest to work
    /d3.*\/.*\.js$/,
    /internmap\/.*\.js$/,
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
};
