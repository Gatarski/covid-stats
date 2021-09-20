import RequestData from './components/RequestData/RequestData';
import CountryData from './components/Country/CountryData';
import covid from './assets/images/covid-19.png'
import './App.css';
import React, { useState } from 'react';

let openedData = false;

function App() {
  const [data, setData] = useState({})

  const dataFromInputsHandler = (dataFromInputs) => {
    openedData = true;
    setData(dataFromInputs)
  };

  const closeCountryData = ()  => {
    openedData = false;
    setData({});
  };
 
  return (
    <React.Fragment>
      <div className="image">
        <img src={covid} alt="covid-19"></img>
      </div>
      <div className="main-app">
        <h2>Covid stats</h2>
        <RequestData onData={dataFromInputsHandler}/>
        {openedData ? <CountryData value={data} onData={closeCountryData}/> : null}
      </div>
    </React.Fragment>
  );
}

export default App;
