import { useState, useRef } from 'react';
import Button from '../UI/Button';
import './UserInput.css'

const UserInput = (props) => {
  const inputCountryRef = useRef();
  const checkboxRef = useRef();

  const [btnDisabled, setBtnDisabled] = useState({
    btnDisabled: true,
    error: false
  });
  const [countryData, setCountryData] = useState({
    country: '',
    checkbox: false
  })

  const dataFromCountryInputHandler = () => {
    setCountryData((prevVal) => {
      return {...prevVal, country: inputCountryRef.current.value }
    });

    if (inputCountryRef.current.value.length > 2) {
      setBtnDisabled({btnDisabled: false, error: false});
     } else {
      setBtnDisabled({btnDisabled: true, error: true});
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
    inputCountryRef.current.value = '';
    setBtnDisabled({btnDisabled: true, error: false});
  }


  return(
    <form onSubmit={clickHandler}>
      <div className="input">
         <input placeholder="Select country" type="text" ref={inputCountryRef} onChange={dataFromCountryInputHandler}></input>
         {btnDisabled.error && <div className="error">Type at least 3 chars</div>}
      </div>
      <div className="checkbox">
        <input type="checkbox" disabled={btnDisabled.btnDisabled} ref={checkboxRef}></input>
        <span>Show more detailed data</span>
      </div>
      <Button className="btn" disabled={btnDisabled.btnDisabled} type="submit">Send</Button>
    </form>
  )
};

export default UserInput;
