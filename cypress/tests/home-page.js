describe.skip("Home Page", function () {
  beforeEach(function () {
    cy.login();
    cy.visit("/home");
  });

  it("should display whose logged in", function () {
    cy.get("span").contains("Logged in as testing@accenture.com");
  });

  it("should include signout button", function () {
    cy.get("button").contains("Sign out");
  });

  it("should have important links", function () {
    cy.get("a[href='/tasks']").contains("Manage project tasks");
    cy.get("a[href='/blog']").contains("Read recent articles");
    cy.get("a[href='/faq']").contains("Read FAQ");
    cy.get("a[href='/support']").contains("Ask for support");
  });
});
