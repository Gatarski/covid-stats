import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import './GlobalData.css'

const GlobalData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    getData();
   }, []);

 
  const getData = async () => {
      const response = await axios.get('https://corona.lmao.ninja/v2/countries?yesterday=&sort=');
      const filteredData = response.data.sort((a, b) => {
        return b.activePerOneMillion - a.activePerOneMillion;
      })
      const filteredDataByPopulation = filteredData.filter((value) => {
        return value.population > 500000
      })
      setData(filteredDataByPopulation);
      setIsLoading(false);
  }

  const topFiveCountries = () => {
    const countries = []
    for (let x = 0; x < 5; x++) {
      countries.push(<li>{data[x].country}: 
                <p>{data[x].activePerOneMillion}</p>
              </li>)
    };
    return countries
  }
  return(
    <>
      <h2>Global Data</h2>
      <h3>Top countries (population</h3>
      <h3> over 0.5 mln) with active</h3>
      <h3>cases per one million:</h3>
      {!isLoading ? <ul className='item-list'>
        {topFiveCountries()}
      </ul> : <div className="lds-dual-ring"></div>}
    </>
  )
}

export default React.memo(GlobalData);
