describe("FAQ Page", function () {
  beforeEach(function () {
    cy.login();
    cy.visit("/faq");
  });

  it("should have a title and back link", function () {
    cy.get("h1").should("have.text", "Frequently Asked Questions");
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
