describe("Inventory Page", () => {
  beforeEach(() => {
    cy.visit("/inventory");
  });

  it("displays inventory items", () => {
    cy.get("[data-testid=inventory-item]").should("be.visible");
  });
});
