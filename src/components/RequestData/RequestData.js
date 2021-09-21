import { useState, useRef } from 'react';
import Button from '../UI/Button';
import './RequestData.css'

const RequestData = (props) => {
  let countryName = '';
  const inputCountryRef = useRef();

  const [btnDisabled, setBtnDisabled] = useState(true);

  const dataFromCountryInputHandler = () => {
    countryName = inputCountryRef.current.value;
    if (countryName) {
      setBtnDisabled(false);
     } else {
      setBtnDisabled(true);
     }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    props.onData(countryName);
  };


  return(
    <form onSubmit={clickHandler}>
      <div className="input">
         <input placeholder="Select country" type="text" ref={inputCountryRef} onChange={dataFromCountryInputHandler}></input>
      </div>
      <Button className="input" disabled={btnDisabled} type="submit">Send</Button>
    </form>
  )
};

export default RequestData;
