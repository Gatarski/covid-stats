import axios from 'axios';
import React from 'react';
import ReactTooltip from "react-tooltip";
import tooltipIcon from '../../assets/icons/tooltip.png'
import { useEffect, useState } from 'react/cjs/react.development';
import './GlobalData.css'
import GlobalDataSingleItem from './GlobalDataSingleItem';

const GlobalData = (props) => {
  const tooltipInfo = 'Top countires (population over 0.5 mln) with active cases per one million'
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    getData();
   }, []);

  const getData = async () => {
      try {
        const response = await axios.get('https://corona.lmao.ninja/v2/countries?yesterday=&sort=');
        props.onGetData(response);
        const filteredData = response.data.sort((a, b) => {
          return b.activePerOneMillion - a.activePerOneMillion;
        })
        const filteredDataByPopulation = filteredData.filter((value) => {
          return value.population > 500000
        })
        setData(filteredDataByPopulation);
    } catch(error) {
      setData({error: error.message})
      props.onGetData({error: error.message});
    }
      setIsLoading(false);
  }

  const topFiveCountries = () => {
    const countries = []
    if (data.error) {
      countries.push(<li>{data.error}</li>)
    } else {
      for (let x = 0; x < 10; x++) {
        countries.push(
          <GlobalDataSingleItem country={data[x].country} activePerOneMillion={data[x].activePerOneMillion}/>)
      };
    }
    return countries
  }

  return(
    <>
      <h2 data-tip data-for="countryTooltip">Global Data
       <img className="tooltip-icon" src={tooltipIcon} alt="tooltip"></img>
      </h2>
      <ReactTooltip className="tooltip" id="countryTooltip" place="top" effect="solid">{tooltipInfo}</ReactTooltip>
      {!isLoading ? <ul className='item-list'>
        {topFiveCountries()}
      </ul> : <div className="lds-dual-ring"></div>}
    </>
  )
}

export default React.memo(GlobalData);
