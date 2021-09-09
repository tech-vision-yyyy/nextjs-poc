describe.skip("Tasks CRUD", function () {
  before(function () {
    cy.login();
  });

  beforeEach(function () {
    cy.visit("/tasks");
  });

  it("should create a task", function () {
    cy.get("h1").should("have.text", "Tasks");
  });
});
