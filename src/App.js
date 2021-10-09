import UserDataRequest from './components/UserDataRequest/UserDataRequest';
import Country from './components/Country/Country';
import covidImage from './assets/images/covid-19.png'
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataFromInputsHandler = (dataFromInputs) => {
    setIsModalOpen(true);
    setData(dataFromInputs);
  };

  const closeCountryData = ()  => {
    setIsModalOpen(false);
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
        {isModalOpen && <Country value={data} onData={closeCountryData}/>}
      </div>
    </>
  );
}

export default App;
