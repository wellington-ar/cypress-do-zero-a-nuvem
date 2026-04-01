const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "mj1b7c",
  allowCypressEnv: false,

  viewportHeight: 800,
  viewportWidth: 1280,
  e2e: {},
});
