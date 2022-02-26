import "./Dropdown.css";
import { ResponseDataProp } from "../../interfaces";
import { useSelector } from "react-redux";

interface Props {
  userInput: string;
  onCountryName: Function;
}

const Dropdown = (props: Props) => {
  const data: ResponseDataProp[] = useSelector((state: any) => state.dataReducer.fetchedData);
  const clickItemHandler = (event: any) => {
    props.onCountryName(event.target.textContent);
  };

  const countries = data.map((el: ResponseDataProp) => {
    return el.country;
  });
  const sortedData = countries.sort();
  const filteredCountries = sortedData.map((country: any) => {
    if (
      country
        .toLowerCase()
        .trim()
        .includes(props.userInput.toLowerCase().trim())
    ) {
      const countryName = country;
      return (
        <li onClick={clickItemHandler} className="list-item" key={country}>
          {countryName}
        </li>
      );
    }
    return null;
  });
  return <ul className="dropdown-list">{filteredCountries}</ul>;
};

export default Dropdown;
