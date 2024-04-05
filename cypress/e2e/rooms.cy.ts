describe("Rooms Page", () => {
  beforeEach(() => {
    cy.visit("/rooms");
  });

  it("redirects to /rooms/1", () => {
    cy.url().should("include", "/rooms/1");
  });

  it("navigates between different rooms", () => {
    const rooms = [1, 2, 3, 4, 5, 6];

    rooms.forEach((room) => {
      cy.visit(`/rooms/${room}`);
      cy.url().should("include", `/rooms/${room}`);
    });
  });

  it("displays rooms reservations", () => {
    cy.get("select").should("be.visible");
    cy.get("[data-testid=reservation]").should("be.visible");
  });

  it("returns 500 error if url does not exist", () => {
    cy.request({
      url: "/rooms/0",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  });
});
