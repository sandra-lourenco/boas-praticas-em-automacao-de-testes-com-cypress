describe("Code duplication bad practice - Sample 2", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search**").as("getStories");

    cy.visit("https://hackernews-seven.vercel.app");
    cy.wait("@getStories");

    cy.get('input[type="text"]')
      .should("be.visible")
      .and("have.value", "redux")
      .as("searchField")
      .clear();
  });
  const terms = ["reactjs", "vuejs"];
  terms.forEach((term) => {
    it('seraches for "${term}"', () => {
      cy.search(term);
      cy.wait("@getStories");
      cy.get(".table-row").should("have.length", 100);
    });
  });

  //it('searches for "reactjs"', () => {
  //cy.search("reactjs");

  //cy.get('@searchField')
  //.type('reactjs{enter}')

  //cy.wait("@getStories");

  //cy.get(".table-row").should("have.length", 100);
  //});

  //it('searches for "vuejs"', () => {
  //cy.search("vuejs");

  //cy.get('@searchField')
  //.type('vuejs{enter}')

  //cy.wait("@getStories");

  //cy.get(".table-row").should("have.length", 100);
  //});
});
