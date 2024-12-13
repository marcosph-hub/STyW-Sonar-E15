describe('Test de Integración - Timer', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/*.js', { statusCode: 200, body: '' });
    cy.visit('/login');
  });

  it('Debe el cronometro funcionar correctamente', () => {
      cy.get('input#email').type('juan@juan.com'); // Cambia el selector
      cy.get('input#password').type('juan');        
      cy.get('button[type="submit"]').click(); // Haz clic en el botón de login
    
      // Verifica que el usuario sea redirigido
      cy.intercept('GET', '/method', {
        statusCode: 200,
        body: [
          { _id: '1', name: 'Método 1', description: 'Descripción del método 1', workDuration: 30, breakDuration: 10 },
          { _id: '2', name: 'Método 2', description: 'Descripción del método 2', workDuration: 45, breakDuration: 15 },
        ],
      }).as('getMethods');
      cy.visit('/method-selection'); // Cambia la ruta según sea necesario

      cy.wait('@getMethods'); // Espera a que se carguen los métodos

      // Haz clic en el botón de seleccionar del primer método
      cy.get('.method-card').first().within(() => {
        cy.get('button').click();
      });

      // Espera un momento para que la redirección ocurra
      cy.wait(1000); // Aumenta el tiempo de espera si es necesario
    
      // Verifica que el usuario sea redirigido
      cy.url().should('include', '/timer'); // Verifica la URL
      cy.get('.timer-button-start').should('be.visible'); // Verifica la clase de la sección
      cy.get('.timer-button-pause').should('be.visible'); // Verifica la clase de la sección   
      cy.get('.timer-button-stop').should('be.visible'); // Verifica la clase de la sección

      // Inicia el cronómetro
      cy.get('.timer-button-start').click(); // Haz clic en el botón de start
      cy.get('.timer-display').should('not.be.empty'); // Verifica que el cronómetro esté en marcha

      // Pausa el cronómetro
      cy.get('.timer-button-pause').click(); // Haz clic en el botón de pause
      cy.get('.timer-button-start').should('be.visible'); // Verifica que el botón de start esté visible

      // Reinicia el cronómetro
      cy.get('.timer-button-stop').click(); // Haz clic en el botón de stop
      cy.get('.timer-display').should('have.text', '00:00'); // Verifica que el cronómetro se haya reiniciado
  });
});