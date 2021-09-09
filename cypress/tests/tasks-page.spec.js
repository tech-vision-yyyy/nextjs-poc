describe("Tasks Page", function () {
  beforeEach(function () {
    cy.login();
    cy.visit("/tasks");
  });

  it("should have a title and back link", function () {
    cy.get("h1").should("have.text", "Tasks");
    cy.get("a[href='/home']").contains("Back");
  });

  it("should have new task button and display tasks", function () {
    cy.get("button.btn-submit").contains("New Task");

    cy.get("table.task-table").within(() => {
      cy.get("tr").its("length").should("be.gte", 0);
    });
  });
});
