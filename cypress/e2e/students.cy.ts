describe("Students Page", () => {
  beforeEach(() => {
    cy.visit("/students");
  });

  it("redirects to /students/1", () => {
    cy.url().should("include", "/students/1");
  });

  it("navigates between different students", () => {
    const students = [
      10810, 16764, 51353, 34648, 16303, 6264, 60403, 32096, 19743, 77988,
    ];
    students.forEach((student) => {
      cy.visit(`/students/${student}`);
      cy.url().should("include", `/students/${student}`);
    });
  });

  it("displays student reservations", () => {
    cy.get("select").should("be.visible");
    cy.get("[data-testid=student-reservation]").should("be.visible");
  });
});
