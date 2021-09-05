describe("unauth view", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("should have a title", function () {
    cy.get("h1").should("have.text", "Welcome to a Next.js Demo!");
  });
});
