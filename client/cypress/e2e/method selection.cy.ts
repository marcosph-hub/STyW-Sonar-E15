

describe('Test de Integración - Method selection', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/*.js', { statusCode: 200, body: '' });
      cy.visit('/login');
    });
  
  
    it('Debe seleccionar correctamente correctamente', () => {
        cy.get('input#email').type('juan@juan.com'); // Cambia el selector
        cy.get('input#password').type('juan');        
      cy.get('button[type="submit"]').click(); // Haz clic en el botón de login
      
  
      // Verifica que el usuario sea redirigido
      // Itera sobre cada tarjeta de método
      cy.get('.methods .method-card').each(($el) => {
        // Verifica que cada tarjeta contiene los elementos esperados
        cy.wrap($el).find('h3').should('not.be.empty'); // Nombre del método
        cy.wrap($el).find('p').should('have.length', 3); // Descripción y tiempos
        cy.wrap($el).find('button').should('contain', 'Seleccionar'); // Botón
      });
      
      cy.get('.methods .method-card').first().within(() => {
        // Haz clic en el botón de selección
        cy.get('button').click();
      });
  
        // Verifica que el usuario sea redirigido
        cy.url().should('include', '/timer'); // Verifica la URL
  
      
    });
  });

  