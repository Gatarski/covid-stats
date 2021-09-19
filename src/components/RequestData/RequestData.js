import { useState } from 'react';
import Button from '../UI/Button';
import './RequestData.css'

const RequestData = (props) => {
  let isDisabled = true;
  
  const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate()

    if (month.toString().length === 1) {
      month = `0${month}`
    }; 

    if (day.toString().length === 1) {
      day = `0${day}`
    };
 
    const date = `${year}-${month}-${day}`
    return date;
  }

  const [dataObj, setDataObj] = useState({
    country: '',
    dateFrom: '',
    dateTo: ''
  })

  const dataFromCountryInputHandler = (data) => {
    setDataObj((prevValue) => {
      return { ...prevValue, country: data.target.value }
    })
  };

  const dataFromDateFromInputHandler = (data) => {
    setDataObj((prevValue) => {
      return { ...prevValue, dateFrom: new Date(data.target.value) }
    })
  };

  const dataFromDateToInputHandler = (data) => {
    setDataObj((prevValue) => {
      return { ...prevValue, dateTo: new Date(data.target.value) }
    })
  };

  const clickHandler = () => {
    props.onData(dataObj);
  };

  if (dataObj.country) {
      isDisabled = false;
  }

  return(
    <div>
      <form>
        <div className="input">
          <label>Country: </label>
          <input type="text" onChange={dataFromCountryInputHandler}></input>
        </div>
        <div className="input">
          <label>Date from: </label>
          <input type="date" min="2019-01-01" max={currentDate()} onChange={dataFromDateFromInputHandler}></input>
        </div>
        <div className="input">
          <label>Date To: </label>
          <input type="date" min="2019-01-01" max={currentDate()} onChange={dataFromDateToInputHandler}></input>
        </div>
      </form>
      <Button className="input" disabled={isDisabled} onClick={clickHandler}>Send</Button>
    </div>
  )
};

export default RequestData;
