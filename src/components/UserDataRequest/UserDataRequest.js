import { useState, useRef, useCallback } from 'react';
import Button from '../UI/Button';
import Dropdown from '../UI/Dropdown';
import './UserDataRequest.css'

const UserDataRequest = (props) => {
  const checkboxRef = useRef();

  const [btnDisabled, setBtnDisabled] = useState({
    btnDisabled: true,
    error: false
  });
  const [countryData, setCountryData] = useState({
    country: '',
    checkbox: false
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dataFromCountryInputHandler = (event) => {
    setCountryData((prevVal) => {
      return {...prevVal, country: event.target.value }
    });

    if (event.target.value.length > 1) {
      setBtnDisabled({btnDisabled: false, error: false});
      setIsDropdownOpen(true);
     } else {
      setBtnDisabled({btnDisabled: true, error: true});
      setIsDropdownOpen(false);
     }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    countryData.checkbox = checkboxRef.current.checked;
    setCountryData((prevVal) => {
      return {...prevVal, checkbox: checkboxRef.current.checked }
    });
    props.onData(countryData);
    clearInputs();
  };

  const clearInputs = () => {
    setCountryData((prevVal) => {
      return {...prevVal, country: '' }
    });
    setBtnDisabled({btnDisabled: true, error: false});
    setIsDropdownOpen(false);
  }
  
  const checkboxHandler = () => {
    if (!btnDisabled.btnDisabled) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    };
  }

  const countryNameFromDropdown = useCallback((countryName) => {
    setCountryData((prevVal) => {
      return {...prevVal, country: countryName }
    });
    setIsDropdownOpen(false);
  }, [])

  const inputCountryCSSClass = !btnDisabled.error 
  ? 'input-country'
  : 'input-country invalid-input'

  return(
    <form onSubmit={clickHandler}>
      <div className="input">
         <input className={inputCountryCSSClass} placeholder="Select country" type="text" value={countryData.country} onChange={dataFromCountryInputHandler}></input>
         {btnDisabled.error && <div className="error">Type at least 2 chars</div>}
         {isDropdownOpen && <Dropdown data={props.data} userInput={countryData.country} onCountryName={countryNameFromDropdown}></Dropdown>}
      </div>
      <div>
        <input className="checkbox" type="checkbox" disabled={btnDisabled.btnDisabled} ref={checkboxRef}></input>
        <span onClick={checkboxHandler}>Show more detailed data</span>
      </div>
      <Button className="btn" disabled={btnDisabled.btnDisabled} type="submit">Send</Button>
    </form>
  )
};

export default UserDataRequest;
