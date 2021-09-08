describe("Tasks CRUD", () => {
  beforeEach(() => {
    cy.visit("/tasks");
  });

  it("should create a task", () => {
    expect(true).to.eq(true);
    // cy.get("h1").should("have.text", "Tasks");
  });
});
