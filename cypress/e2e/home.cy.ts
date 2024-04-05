describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects to /rooms/1", () => {
    cy.url().should("include", "/rooms/1");
  });
});
