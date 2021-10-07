import UserInput from './components/UserInput/UserInput';
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

  return (
    <>
      <div className="image">
        <img src={covidImage} alt="covid-19"></img>
      </div>
      <div className="main-app">
        <h2>Covid stats</h2>
        <UserInput onData={dataFromInputsHandler}/>
        {isModalOpen && <Country value={data} onData={closeCountryData}/>}
      </div>
    </>
  );
}

export default App;
