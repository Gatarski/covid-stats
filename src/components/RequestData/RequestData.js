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

  const clickHandler = () => {
    props.onData(countryName);
  };


  return(
    <div>
      <form>
        <div className="input">
          <input placeholder="Select country" type="text" ref={inputCountryRef} onChange={dataFromCountryInputHandler}></input>
        </div>
      </form>
      <Button className="input" disabled={btnDisabled} onClick={clickHandler}>Send</Button>
    </div>
  )
};

export default RequestData;
