describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("Should add a new todo", () => {
<<<<<<< HEAD
    cy.get("#input").type("Hello, World{enter}");
    cy.get("#item_input").should("have.value", "World");
=======
    // TODO: fill this test
    cy.get('[type="text"]').should("not.have.value", "submit");
    cy.get("form").contains("age").click();
    return;
    cy.get("#user_input").type("AAA{enter}");
    // const x = cy.get("ul li").last();
    cy.get("ul input").should("have.value", "rr");
>>>>>>> ad1dff342fb59bc80305f8a8a929563854035819
  });
});
