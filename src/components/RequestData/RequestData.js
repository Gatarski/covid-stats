import { useState, useRef } from 'react';
import Button from '../UI/Button';
import './RequestData.css'

const RequestData = (props) => {
  const countryData = {
    country: '',
    checkbox: false
  };
  
  const inputCountryRef = useRef();
  const checkboxRef = useRef();

  const [btnDisabled, setBtnDisabled] = useState(true);

  const dataFromCountryInputHandler = () => {
    countryData.country = inputCountryRef.current.value;
    if (countryData.country) {
      setBtnDisabled(false);
     } else {
      setBtnDisabled(true);
     }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    countryData.checkbox = checkboxRef.current.checked;
    props.onData(countryData);
    clearInputs();
  };

  const clearInputs = () => {
    inputCountryRef.current.value = '';
    setBtnDisabled(true);
  }


  return(
    <form onSubmit={clickHandler}>
      <div className="input">
         <input placeholder="Select country" type="text" ref={inputCountryRef} onChange={dataFromCountryInputHandler}></input>
      </div>
      <div className="checkbox">
        <input type="checkbox" disabled={btnDisabled} ref={checkboxRef}></input>
        <span>Show more detailed data</span>
      </div>
      <Button className="btn" disabled={btnDisabled} type="submit">Send</Button>
    </form>
  )
};

export default RequestData;
