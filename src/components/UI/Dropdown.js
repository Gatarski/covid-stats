import React from 'react';
import './Dropdown.css'

const Dropdown = (props) => {
  console.log('dropdpown')
  const clickItemHandler = (event) => {
    props.onCountryName(event.target.textContent)
  }
  const countries = props.data.data.map(el => {
    return el.country;
});
  const sortedData = countries.sort();
  const filteredCountries = sortedData.map((country) => {
    if (country.includes(props.userInput)) {
      const countryName = country;
      return <li onClick={clickItemHandler} className='list-item' key={country}>{countryName}</li>
    }
    return null;
})
  return(
      <ul className='dropdown-list'>
          {filteredCountries}
      </ul>
  )
};

export default React.memo(Dropdown);
