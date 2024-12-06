import { defineConfig } from 'cypress';


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Cambia según tu servidor
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'webpack',
    },
  },
});
