import axios from 'axios';
import React, { useState } from 'react';
import Modal from '../UI/Modal';
import './CountryData.css'

let countryData = {};

const CountryData = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  let countryFlag = '';
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
      countryFlag = countryData.countryInfo.flag;
    } else {
      if (!modalMessage) {
        setModalMessage(props.value.country);
      }
    }
  
    const clickButtonHandler = () => {
      props.onData()
    }
    // DODAC dodatkowe info jak jest zaznaczony checkbox
    console.log(props.value)
  return(
    <React.Fragment>
      <h2>Country: {countryData.country}
       <img className="flag" src={countryFlag} alt="flag"></img>
      </h2>
      <span>
        <div className="data">Cases:
          <div className="data-cases">{countryData.cases}</div>
        </div>
        <div className="data">Deaths:
          <div className="data-deaths">{countryData.deaths}</div>
        </div>
        <div className="data">Recovered:
          <div className="data-recovered">{countryData.recovered}</div>
        </div>
      </span>
      <div className="data-info">Data from: https://corona.lmao.ninja/v2/</div>
      {modalMessage ? <Modal title="Error" message={`Country ${modalMessage} does not exist.`
      } onClick={clickButtonHandler}></Modal> : null}
    </React.Fragment>
  )
};

export default CountryData;
