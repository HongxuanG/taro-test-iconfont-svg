const path = require("path");
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {},

  alias: {
    "@": path.resolve(__dirname, "..", "src")
  }
};
