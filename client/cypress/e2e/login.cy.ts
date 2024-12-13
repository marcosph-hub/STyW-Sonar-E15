describe('Test de Integración - Login', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/*.js', { statusCode: 200, body: '' });
      cy.visit('/login');
      cy.intercept('POST', '/user/login', {
        statusCode: 401,
        body: { message: 'Invalid password' },
    }).as('WrongPasswd');
    });
  
  
    it('Debe iniciar sesión correctamente', () => {
        cy.get('input#email').type('juan@juan.com'); // Cambia el selector
        cy.get('input#password').type('juan');        
      cy.get('button[type="submit"]').click(); // Haz clic en el botón de login
  
  
      // Verifica que el usuario sea redirigido
      cy.url().should('include', '/'); // Verifica la URL
    });
  
    it('Debe mostrar un error con credenciales incorrectas', () => {
        cy.get('input#email').type('juan@juan.com'); // Cambia el selector
        cy.get('input#password').type('contraseñaIncorrecta');        
        cy.get('button[type="submit"]').click(); // Haz clic en el botón de login
  
        // Verifica que se muestre un mensaje de error
        cy.wait('@WrongPasswd').its('response.statusCode').should('eq', 401); // Espera a la solicitud de login y verifica el código de estado 401
    });
  });

  