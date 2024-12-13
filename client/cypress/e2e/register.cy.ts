describe('Test de Integración - Registro de Usuario', () => {
    beforeEach(() => {
        cy.intercept('POST', '/user/register', {
            statusCode: 201,
            body: { message: 'Usuario creado exitosamente' },
        }).as('registerUser');
        cy.visit('/register');
    });

    it('Debe registrar un usuario correctamente', () => {
        cy.get('input#name').type('Juan Pérez');
        cy.get('input#email').type('juan@juan.com');
        cy.get('input#password').type('contraseña123');
        cy.get('select#role').select('student');

        cy.get('button[type="submit"]').click();

        cy.wait('@registerUser').its('response.statusCode').should('eq', 201);
    });

    it('Debe mostrar errores de validación', () => {
        cy.get('button[type="submit"]').click();

        cy.contains('El nombre es obligatorio.').should('be.visible');
        cy.contains('El email es obligatorio.').should('be.visible');
        cy.contains('La contraseña es obligatorio.').should('be.visible');
        cy.contains('El rol es obligatorio.').should('be.visible');
    });
});
