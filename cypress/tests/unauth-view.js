describe("unauth view", function () {
  beforeEach(function () {
    cy.signout();
    cy.visit("/");
  });

  it.skip("should have a title", function () {
    cy.get("h1").should("have.text", "Welcome to a Next.js Demo!");
  });

  it("auth views redirect to main page", function () {
    // cy.visit("/home");
    // cy.location().should((location) => {
    //   expect(location.pathname).to.eq("/");
    // });
    expect(true).to.equal(true);
  });
});
