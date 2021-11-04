export class CovidStat {
  globalDataChekboxSelector = ':nth-child(3) > span > .checkbox';
  detailedDataCheckboxSelector = ':nth-child(2) > span > .checkbox';
  countryInputSelector = '.input-country';
  errorSelector = '.error';
  dropdownSelector = '.dropdown-list';
  generalCountryData = [
    { sel: 'h2', expectedVal: 'Country' },
    { sel: 'h3', expectedVal: 'Population' },
    { sel: '.data', expectedVal: 'Cases' },
    { sel: '.data', expectedVal: 'Deaths' },
    { sel: '.data', expectedVal: 'Recovered' }
  ]


  pushCountiresToArray = (array) => {
    cy.get('.item-list').find('li').each((item) => {
      array.push((item[0].textContent.split(':')[0]));
    });
  }

  fillInput = (text, enter = false, detailedCheckbox = false) => {
    cy.get(this.countryInputSelector).clear().type(`${text}`);
    if (detailedCheckbox) {
      cy.get(this.detailedDataCheckboxSelector).click();
    }
    cy.get(this.countryInputSelector).type(`{${enter ? 'enter' : 'esc'}}`);
  };

  checkValidation = (text) => {
    cy.get(this.errorSelector).contains(text);
  }

  checkCountryData = () => {
    this.generalCountryData.forEach((item) => {
      cy.get(item.sel).contains(item.expectedVal);
    })
    cy.get('.main-app > .item-list').should('not.exist');
  }

  checkDetailedData = () => {
    const detailedValues = ['Active cases', '(currently', 'Active cases per one million', 
    'Deaths per one million', 'Tests', 'Tests per one million', 'Today cases',
    'Today deaths', 'Today recovered']
    this.generalCountryData.forEach((item) => {
      cy.get(item.sel).contains(item.expectedVal);
    })
    cy.get('.main-app > .item-list').find('li').each((item, idx) => {
      expect(item.text()).contains(detailedValues[idx]);
    });
  }
}
