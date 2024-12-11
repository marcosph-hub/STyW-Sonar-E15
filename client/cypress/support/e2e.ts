import '@cypress/code-coverage/support';

// Importa comandos personalizados (si existen)
import './commands';

// Manejar errores globales en Cypress
Cypress.on('uncaught:exception', (err) => {
  console.log('Error capturado:', err.message);
  return false; // Evita que el test falle
});

// Configuración para todos los tests
beforeEach(() => {
  cy.log('Iniciando prueba...');
});
