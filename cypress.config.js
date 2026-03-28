const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  viewportHeight: 800,
  viewportWidth: 1280,
  e2e: {},
});
