import './DetailedCountryData.css'
import { ResponseDataProp } from '../../interfaces';

interface Props {
  data: ResponseDataProp
}

const DetailedCountryData = (props: Props) => {
  const percentOfCountryPopulation = (number: number) => {
    return `${(number / props.data.population).toFixed(4)} %`
  };

  return (
    <>
      <h2 className='details-text'>More details:</h2>
      <ul className='item-list'>
        <li>Active cases:
          <p>{props.data.active}</p>
        </li>
        <li>(currently
          <p>{percentOfCountryPopulation(props.data.active)}</p>
         of country population are sick)</li>
        <li>Active cases per one million:
          <p>{props.data.activePerOneMillion}</p>
        </li>
        <li>Deaths per one million:
          <p>{props.data.deathsPerOneMillion}</p>
        </li>
        <li>Tests:
          <p>{props.data.tests}</p>
        </li>
        <li>Tests per one million:
          <p>{props.data.testsPerOneMillion}</p>
        </li>
        <li>Today cases:
          <p>{props.data.todayCases}</p>
        </li>
        <li>Today deaths:
          <p>{props.data.todayDeaths}</p>
        </li>
        <li>Today recovered:
          <p>{props.data.todayRecovered}</p>
        </li>
      </ul>
    </>
  )
}

export default DetailedCountryData;
