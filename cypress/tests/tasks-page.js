describe.skip("Tasks Page", function () {
  before(function () {
    cy.login();
  });

  beforeEach(function () {
    cy.visit("/tasks");
  });

  it("should have a title", function () {
    cy.get("h1").should("have.text", "Tasks");
  });

  it("should have a back link", function () {
    cy.get("a[href='/home']").contains("Back");
  });

  it("should enable task creation", function () {
    // TODO
  });
});
