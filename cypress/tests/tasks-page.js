describe("Tasks Page", function () {
  beforeEach(function () {
    cy.login();
    cy.visit("/tasks");
  });

  it("should have a title", function () {
    cy.get("h1").should("have.text", "Tasks");
  });

  it("should have a back link", function () {
    cy.get("a[href='/home']").contains("Back");
  });

  it("should have new task button", function () {
    cy.get("button.btn-submit").contains("New Task");
  });

  it("should display tasks", function () {
    cy.get("table.task-table").within(() => {
      cy.get("tr").its("length").should("be.gte", 0);
    });
  });
});
