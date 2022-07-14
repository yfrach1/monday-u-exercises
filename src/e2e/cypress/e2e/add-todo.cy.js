describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should add a new todo", () => {
    // TODO: fill this test
    cy.get("#user_input").type("enter some data{enter}");
    cy.contains("ul", "Enter some data");
    // cy.get("#list_items")
    //   .findByText(/enter some data/i)
    //   .should("exist");
    // cy.wait(2000);
    // const inputTextBox = cy
    //   .find("#user_input")
    //   .type("enter some data")
    //   .type("{ enter }");
    // console.log();
  });
});
