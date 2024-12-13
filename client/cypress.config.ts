import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'webpack',
    },
  },
});
