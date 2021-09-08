describe("Tasks CRUD", () => {
  beforeEach(() => {
    cy.visit("/tasks");
  });

  it("should create a task", () => {
    cy.get("h1").should("have.text", "Tasks");
  });
});
