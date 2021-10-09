import UserDataRequest from './components/UserDataRequest/UserDataRequest';
import Country from './components/Country/Country';
import GlobalData from './components/GlobalData/GlobalData';
import covidImage from './assets/images/covid-19.png'
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState({});
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const dataFromInputsHandler = (dataFromInputs) => {
    setIsCountryOpen(true);
    setData(dataFromInputs);
  };

  const closeCountryData = ()  => {
    setIsCountryOpen(false);
  };

  const currentDate = () => {
    return new Date().toISOString().slice(0, 10)
  }

  return (
    <>
      <div className="image">
        <img src={covidImage} alt="covid-19"></img>
      </div>
      <div className="main-app">
        <h2>Covid stats  ({currentDate()})</h2>
        <UserDataRequest onData={dataFromInputsHandler}/>
        {isCountryOpen && <Country value={data} onData={closeCountryData}/>}
      </div>
      <div className="global-data">
       <GlobalData></GlobalData>
      </div>
    </>
  );
}

export default App;
