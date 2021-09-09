describe.skip("FAQ Page", function () {
  before(function () {
    cy.login();
  });

  beforeEach(function () {
    cy.visit("/faq");
  });

  it("should have a title", function () {
    cy.get("h1").should("have.text", "Frequently Asked Questions");
  });

  it("should have a back link", function () {
    cy.get("a[href='/home']").contains("Back");
  });

  it("should have an answer for each question", function () {
    cy.get(".faq-question").then((questions) => {
      cy.get(".faq-answer").then((answers) => {
        expect(questions.length).to.equal(answers.length);
      });
    });
  });
});
