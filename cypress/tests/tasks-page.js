describe.skip("Tasks Page", function () {
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
});
