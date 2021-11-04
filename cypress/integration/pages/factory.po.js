export class HelperMethods {

  visitPage = (url = '/') => {
    cy.wait(500);
    cy.visit(url);
    cy.wait(500);
  };

  convertArrayToString = (array) => {
    let finalString = ''
    array.sort().forEach((item) => {
      finalString += `${item} `
    });
    return finalString;
  };

  checkListLength = (list, item, length) => {
    cy.get(list, { timeout: 10000 }).find(item).should('have.length', length);
  };

  checkModal = (headerText, modalText, clickOkay = false) => {
    cy.get('.modal').should('exist');
    cy.get('.header > h2').contains(headerText);
    cy.get('div > p').contains(modalText);
    if (clickOkay) {
      cy.get('footer button').click();
    }
  }
}

