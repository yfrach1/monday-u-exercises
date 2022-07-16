describe("Add Todo Action", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should add a new todo", () => {
    // TODO: fill this test
    cy.get("#user_input").type("AAA{enter}");
    // const x = cy.get("ul li").last();
    // console.log(x.find("input").should("have.value", "AAA"));
  });
});
