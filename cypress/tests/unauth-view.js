describe.skip("unauth view", function () {
  beforeEach(function () {
    cy.signout();
    cy.visit("/");
  });

  it("should have a title", function () {
    cy.get("h1").should("have.text", "Welcome to a Next.js Demo!");
  });

  it("should redirect to main page when navigating to an auth view", function () {
    cy.visit("/home");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/api/auth/signin");
    });
  });

  it("should include the login link", function () {
    cy.get("a[href='/api/auth/signin']").contains("logging in.");
  });

  it("should have other important links", function () {
    cy.get("a[href='https://nextjs.org/docs']");
    cy.get("a[href='https://nextjs.org/learn']");
    cy.get("a[href='https://github.com/vercel/next.js/tree/master/examples']");
    cy.get("a[href='https://vercel.com/new']");
  });
});
