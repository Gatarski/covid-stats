/// <reference types="cypress" />
import { CovidStat } from "./pages/covidstat.po";
import { HelperMethods } from "./pages/factory.po";

const helperMethod = new HelperMethods;
const covidStat = new CovidStat;
const countryList = [];
const secondCountryList = [];

describe('Check global data', () => {
  it('should load page', () => {
    helperMethod.visitPage();
  });

  it('should check loaded default countires', () => {
    helperMethod.checkListLength('.item-list', 'li', 5);
    covidStat.pushCountiresToArray(countryList);
  });

  it('should click checkbox', () => {
    cy.get(covidStat.globalDataChekboxSelector).should('not.be.checked');
    cy.get(covidStat.globalDataChekboxSelector).click();
    covidStat.pushCountiresToArray(secondCountryList);
  });

  it('should compare that countires has changed', () => {
    helperMethod.checkListLength('.item-list', 'li', 5);
    const firstList = helperMethod.convertArrayToString(countryList);
    const secondList = helperMethod.convertArrayToString(secondCountryList);
    expect(firstList).to.not.equal(secondList);
  });
});

describe('Check specific countires', () => {
  it('should check country input validations', () => {
    covidStat.fillInput('P');
    covidStat.checkValidation('Type at least 2 chars');
    cy.get(covidStat.dropdownSelector).should('not.exist');
  });

  it('should check that country dropdown appears', () => {
    covidStat.fillInput('Po');
    cy.get(covidStat.dropdownSelector).should('be.visible');
  });

  it('should find data for country', () => {
    covidStat.fillInput('Poland', true);
  });

  it('should assert data for above country', () => {
    covidStat.checkCountryData('Poland');
  });

  it('should find detailed data for other country', () => {
    covidStat.fillInput('Spain', true, true);
  });

  it('should assert data for above country', () => {
    covidStat.checkDetailedData()
  });

  it('should search by non existing country', () => {
    covidStat.fillInput('NotExistingCountry', true);
  });

  it('should check dialogbox', () => {
    helperMethod.checkModal('Error', 'Country NotExistingCountry does not exist', true)
  });

});

describe('Check mocked data', () => {
  it('should mock request to API to response 404', () => {
    cy.intercept('GET', 'https://corona.lmao.ninja/v2/*', 
    {
      statusCode: 404,
      body: {}
    })
    helperMethod.visitPage();
  });

  it('should check validation error for fallback mocked data', () => {
    covidStat.checkValidation('Something went wrong. Mocked data provided.')
  });

  it('should find country from mocked data', () => {
    covidStat.fillInput('Poland', true);
  });

  it('should assert data for above country', () => {
    covidStat.checkCountryData('Poland');
  });
});
