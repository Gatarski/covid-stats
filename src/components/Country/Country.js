import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Modal from '../UI/Modal';
import './Country.css'
import CountryData from './CountryData';
import DetailedCountryData from './DetailedCountryData'

const Country = (props) => {
  const [data, setData] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  let countryFlag = '';
  let filteredData = {};
  const detailedData = props.value.checkbox;
  
  useEffect(() => {
    if (props.data.error) {
      setModalMessage(props.data.error)
    } else {
      setData(props.data.data);
    }
    setIsLoading(false);
   }, [props.data]);
 
 
  const getDataByCountry = (countryName) => {
      return data.find((item) => {
        return item.country === countryName;
      });
  };
  
  const clickButtonHandler = () => {
    props.onClose()
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

  if (data.length) {
    filterData()
  }
 
  return(
    <>
      {!isLoading ? <CountryData 
        country={filteredData.country} 
        flag={countryFlag} 
        cases={filteredData.cases} 
        deaths={filteredData.deaths} 
        recovered={filteredData.recovered}
        population={filteredData.population}/> : <div className="lds-dual-ring"></div>}
      {detailedData && <DetailedCountryData data={filteredData}/>}
      <div className="data-info">Data from: https://corona.lmao.ninja/v2/</div>
      {modalMessage && <Modal title="Error" message={modalMessage} onClick={clickButtonHandler}></Modal>}
    </>
  )
};

export default Country;
