describe('Test de Integración - Method Selection', () => {
    beforeEach(() => {
        cy.intercept('GET', '/method', {
            statusCode: 200,
            body: [
                { _id: '1', name: 'Método 1', description: 'Descripción del método 1', workDuration: 30, breakDuration: 10 },
                { _id: '2', name: 'Método 2', description: 'Descripción del método 2', workDuration: 45, breakDuration: 15 },
            ],
        }).as('getMethods');
        cy.visit('/method-selection'); // Cambia la ruta según sea necesario
    });

    it('Debe cargar y mostrar los métodos de estudio', () => {
        cy.wait('@getMethods'); // Espera a que se carguen los métodos

        // Verifica que los métodos se muestren en la interfaz
        cy.get('.method-card').should('have.length', 2); // Verifica que hay 2 métodos
        cy.get('.method-card').first().within(() => {
            cy.get('h3').should('contain', 'Método 1'); // Verifica el nombre del primer método
            cy.get('p').should('contain', 'Descripción del método 1'); // Verifica la descripción
            cy.get('.work-duration').should('contain', '30'); // Verifica el tiempo de trabajo
            cy.get('.break-duration').should('contain', '10'); // Verifica el tiempo de descanso
        });
    });

    it('Debe seleccionar un método y redirigir al usuario', () => {
        cy.wait('@getMethods'); // Espera a que se carguen los métodos

        // Haz clic en el botón de seleccionar del primer método
        cy.get('.method-card').first().within(() => {
            cy.get('button').click();
        });

        // Espera un momento para que la redirección ocurra
        cy.wait(5000); // Aumenta el tiempo de espera si es necesario

        cy.url().should('include', '/subject');
    });
}); 