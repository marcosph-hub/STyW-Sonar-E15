

describe('Test de Integración - Login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
  
    it('Debe iniciar sesión correctamente', () => {
      cy.get('input[name="email"]').type('hash2@hash2.com'); // Completa el campo de email
      cy.get('input[name="password"]').type('hashed'); // Completa el campo de contraseña
      cy.get('button[type="submit"]').click(); // Haz clic en el botón de login
  
  
      // Verifica que el usuario sea redirigido
      cy.url().should('include', '/dashboard'); // Verifica la URL
      cy.contains('Bienvenido').should('be.visible'); // Verifica un mensaje en el dashboard
    });
  });

  