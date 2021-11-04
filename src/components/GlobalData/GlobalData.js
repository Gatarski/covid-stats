import axios from 'axios';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import tooltipIcon from '../../assets/icons/tooltip.png'
import { useEffect, useState } from 'react/cjs/react.development';
import './GlobalData.css'
import GlobalDataSingleItem from './GlobalDataSingleItem';
import MOCKED_DATA from '../../MOCKED_DATA';
import Checkbox from '../UI/Checkbox';

const GlobalData = (props) => {
  const countiresToDisplay = 5;
  const tooltipInfo = 'Top countires (population over 0.5 mln) with active cases per one million'
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([])
  const [isLoading, setIsLoading] = useState(true); 
  const [isMockedData, setIsMockedData] = useState(false);
 
  useEffect(() => {
    getData();
   }, []);

  const filterData = (data) => {
    props.onGetData(data);
    const filteredData = data.data.sort((a, b) => {
      return b.activePerOneMillion - a.activePerOneMillion;
    })
    const filteredDataByPopulation = filteredData.filter((value) => {
      return value.population > 500000
    })
    setData(filteredDataByPopulation);
  }
  const getData = async () => {
      try {
        const response = await axios.get('https://corona.lmao.ninja/v2/countries?yesterday=&sort=');
        setOriginalData(response)
        filterData(response)
    } catch(error) {
      filterData(MOCKED_DATA)
      setIsMockedData(true);
    }
      setIsLoading(false);
  }
  const topCountries = () => {
    const countries = []
      for (let x = 0; x < countiresToDisplay; x++) {
        countries.push(
          <GlobalDataSingleItem key={data[x].country} country={data[x].country} activePerOneMillion={data[x].activePerOneMillion}/>)
      };
    return countries
  }
  const checkboxHandler = (event) => {
    const filteredData = originalData.data.sort((a, b) => {
      return b.activePerOneMillion - a.activePerOneMillion;
    })
     !event ? setData(filteredData) : filterData(originalData);
  }

  return(
    <>
      <h2 data-tip data-for='countryTooltip'>Global Data
       <img className='tooltip-icon' src={tooltipIcon} alt='tooltip'></img>
      </h2>
      <ReactTooltip className='tooltip' id='countryTooltip' place='top' effect='solid'>{tooltipInfo}</ReactTooltip>
      <div>
         <Checkbox disabled={isLoading || isMockedData} onCheckboxData={checkboxHandler} message='Include small countries'></Checkbox>
      </div>
      {isMockedData && <div className='error'>Something went wrong. Mocked data provided.</div>}
      {!isLoading ? <ul className='item-list'>
        {topCountries()}
      </ul> : <div className='lds-dual-ring'></div>}
    </>
  )
}

export default React.memo(GlobalData);
