describe("Support Page", function () {
  beforeEach(function () {
    cy.login();
    cy.visit("/support");
  });

  it("should have a title", function () {
    cy.get("h1").should("have.text", "Report an Issue");
  });

  it("should have a back link", function () {
    cy.get("a[href='/home']").contains("Back");
  });

  it.only("should have a submit form", function () {
    cy.get("form.support-form").within(() => {
      cy.get("input[name='project-name']").type("Trial");
      cy.get("input[name='short-description']").type("Trial expired - renewal");
      cy.get("textarea[name='description']").type(
        "Asking for trial extension."
      );
      cy.get("button.btn-submit").focus();
    });
  });
});
