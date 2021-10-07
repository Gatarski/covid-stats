import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Modal from '../UI/Modal';
import './Country.css'
import CountryData from './CountryData';
import DetailedCountryData from './DetailedCountryData'

const Country = (props) => {
  const [data, setData] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
 
  useEffect(() => {
    getData();
   }, []);

  let countryFlag = '';
  let filteredData = {};
  const detailedData = props.value.checkbox;
 
  const getData = async () => {
    try {
      const response = await axios.get('https://corona.lmao.ninja/v2/countries?yesterday=&sort=');
      setData(response.data);
    } catch(error) {
      setModalMessage(error.message);
    }
    setIsLoading(false);
   }
 
  const getDataByCountry = (countryName) => {
      return data.find((item) => {
        return item.country === countryName;
      });
  };
  
  const clickButtonHandler = () => {
    props.onData()
  }

  const filterData = () => {
    if (getDataByCountry(props.value.country)) {
      filteredData = getDataByCountry(props.value.country); 
      countryFlag = filteredData.countryInfo.flag;
    } else {
      if (!modalMessage) {
        setModalMessage(`Country ${props.value.country} does not exist`);
      }
    }
  }

  try {
    filterData()
  } catch(e) {
    console.log('There is nothing to filter')
  }

  return(
    <>
      {!isLoading ? <CountryData country={filteredData.country} flag={countryFlag} cases={filteredData.cases} deaths={filteredData.deaths} recovered={filteredData.recovered}/> : <div className="lds-dual-ring"></div>}
      {detailedData && <DetailedCountryData data={filteredData}/>}
      <div className="data-info">Data from: https://corona.lmao.ninja/v2/</div>
      {modalMessage && <Modal title="Error" message={modalMessage} onClick={clickButtonHandler}></Modal>}
    </>
  )
};

export default Country;
