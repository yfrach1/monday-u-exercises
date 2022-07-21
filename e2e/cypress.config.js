const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  viewportWidth: 1536,
  viewportHeight: 960,
  e2e: {
    baseUrl: "http://localhost:3001",
  },
});
