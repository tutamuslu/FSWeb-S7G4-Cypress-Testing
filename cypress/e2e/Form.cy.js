describe('Form testleri', () => {
    it('name boş mu?', () =>{
        cy.visit("http://localhost:3000");
        cy.get('input[name="name"]').type("test");
        cy.get('input[name="name"]').clear();
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('form name minimum 5 karakter testi', () => {
        cy.visit("http://localhost:3000/");
        cy.get('input[name="name"]').type("dene");
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('form name doğru girilme testi', () => {
        cy.visit("http://localhost:3000/");
        cy.get('input[name="name"]').type("tuğba");
        cy.get('.invalid-feedback').should('not.to.be.visible');
    })
    it('email girildi mi?', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="email"]').type("test");
        cy.get('input[name="email"]').clear();
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('email geçerli değil 1', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="email"]').type("test@");
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('email geçerli değil 2', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="email"]').type("test");
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('email geçerli', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="email"]').type("test@test.com");
        cy.get('.invalid-feedback').should('not.visible');
    })
    it('şifre girildi mi?', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="password"]').type("test");
        cy.get('input[name="password"]').clear();
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('şifre 8 karakter değil hatası', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="password"]').type("test");
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('şifre geçerli girildi', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="password"]').type("testtestest");
        cy.get('.invalid-feedback').should('not.visible');
    })
    it('tüm form dolduruldu', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('input[name="name"]').type("Tuğba Muslu");
        cy.get('input[name="email"]').type("tugba@gmail.com");
        cy.get('input[name="password"]').type("12345678");
        cy.get('input[name="termAccept"]').check();
        cy.get('button[name="submit"]').should("be.enabled")
    })
});