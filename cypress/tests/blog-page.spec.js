describe("Blog Page", function () {
  beforeEach(function () {
    cy.login();
    cy.visit("/blog");
  });

  it("should have a title and back link", function () {
    cy.get("h1").should("have.text", "Blog");
    cy.get("a[href='/home']").contains("Back");
  });

  it("should have a featured post", function () {
    cy.get(".featured-section").within(() => {
      cy.get("h2").contains("Featured");
    });
  });

  it("should display recent posts", function () {
    cy.get(".recent-section").within(() => {
      cy.get("h2").contains("Recent");
    });
  });

  it("should include a load more button", function () {
    cy.get("button.btn-loadMore");
  });
});
