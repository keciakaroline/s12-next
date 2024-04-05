describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects to /rooms/1", () => {
    cy.url().should("include", "/rooms/1");
  });

  it("navigates between 'rooms', 'students' and 'inventory' pages", () => {
    cy.get("[data-testid=rooms-link]").click();
    cy.url().should("include", "/rooms");

    cy.get("[data-testid=students-link]").click();
    cy.url().should("include", "/students");

    cy.get("[data-testid=inventory-link]").click();
    cy.url().should("include", "/inventory");
  });
});
