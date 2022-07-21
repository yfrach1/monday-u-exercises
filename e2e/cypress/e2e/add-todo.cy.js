describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("Should add a new todo", () => {
    cy.get("#input").type("Hello, World{enter}");
    cy.get("#item_input").should("have.value", "World");
  });
});
