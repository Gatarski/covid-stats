import React, { useState } from 'react';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import Dropdown from '../UI/Dropdown';
import './UserDataRequest.css'

const UserDataRequest = (props) => {
  const [btnDisabled, setBtnDisabled] = useState({
    btnDisabled: true,
    error: false
  });
  const [countryData, setCountryData] = useState({
    country: '',
    checkbox: false
  })
  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dataFromCountryInputHandler = (event) => {
    setCountryData((prevVal) => {
      return {...prevVal, country: event.target.value }
    });

    if (event.target.value.length > 1 && props.data.data.length) {
      setBtnDisabled({btnDisabled: false, error: false});
      setIsDropdownOpen(true);
     } else {
      setBtnDisabled({btnDisabled: true, error: true});
      setIsDropdownOpen(false);
     }
  };
  const getCheckboxHandler = (event) => {
    setIsChecked(event)
  }
  const clickHandler = (event) => {
    event.preventDefault();
    countryData.checkbox = isChecked;
    setCountryData((prevVal) => {
      return {...prevVal, checkbox: isChecked }
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

  const countryNameFromDropdown = (countryName) => {
    setCountryData((prevVal) => {
      return {...prevVal, country: countryName }
    });
    setIsDropdownOpen(false);
  }

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
        <Checkbox disabled={btnDisabled.btnDisabled} onCheckboxData={getCheckboxHandler} message='Show more detailed data'></Checkbox>
      </div>
      <Button className="btn" disabled={btnDisabled.btnDisabled} type="submit">Send</Button>
    </form>
  )
};

export default UserDataRequest;
