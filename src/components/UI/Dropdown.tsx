import './Dropdown.css'
import { ResponeData } from '../../interfaces';

interface Props {
  data: ResponeData,
  userInput: string,
  onCountryName: Function
}

const Dropdown = (props: Props) => {
  const clickItemHandler = (event: any) => {
    props.onCountryName(event.target.textContent)
  }
  const countries = props.data.data.map(el => {
    return el.country;
});
  const sortedData = countries.sort();
  const filteredCountries = sortedData.map((country) => {
    if (country.toLowerCase().trim().includes(props.userInput.toLowerCase().trim())) {
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

export default Dropdown;
