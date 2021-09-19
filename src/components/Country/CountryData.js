import axios from 'axios';
import React, { useState } from 'react';
import Modal from '../UI/Modal';
import './CountryData.css'

let countryData = {};

const CountryData = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [modalMessage, setModalMessage] = useState();


  if (isLoading) {
    axios.get('https://corona.lmao.ninja/v2/countries?yesterday=&sort=')
    .then(respone => {
      setData(respone.data);
      setLoading(false);
    })
    return <div className="lds-dual-ring"></div>
  }

  const getDataByCountry = (countryName) => {
    return data.find((item) => {
      return item.country === countryName;
    });
  };

    if (getDataByCountry(props.value.country)) {
      countryData = getDataByCountry(props.value.country); 
    } else {
      if (!modalMessage) {
        setModalMessage(props.value.country);
      }
    }
  
    const clickButtonHandler = () => {
      props.onData()
    }

  return(
    <React.Fragment>
      <h2>Country: {countryData.country}</h2>
      <span>
        <div className="data">Cases: {countryData.cases}</div>
        <div className="data">Deaths: {countryData.deaths}</div>
        <div className="data">Recovered: {countryData.recovered}</div>
      </span>
      <div className="data-info">Data from: https://corona.lmao.ninja/v2/</div>
      {modalMessage ? <Modal title="Error" message={`Country ${modalMessage} does not exist.`
      } onClick={clickButtonHandler}></Modal> : null}
    </React.Fragment>
  )
};

export default CountryData;
