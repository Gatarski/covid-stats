import './CountryData.css'

const CountryData = (props) => {
  const countryPopulation = () => {
    return `${(props.population / 1000000).toFixed(2)} mln`
  }
  return(
    <>
      <h2>Country: {props.country}
      <img className='flag' src={props.flag} alt='flag'></img>
      </h2>
      <h3>Population: {countryPopulation()}</h3>
        <span>
          <div className='data'>Cases:
            <div className="data-cases">{props.cases}</div>
          </div>
          <div className='data'>Deaths:
            <div className='data-deaths'>{props.deaths}</div>
          </div>
          <div className='data'>Recovered:
            <div className='data-recovered'>{props.recovered}</div>
          </div>
        </span>
    </>
  )
  }

export default CountryData;
