const CountryData = (props) => {
return(
  <>
    <h2>Country: {props.country}
    <img className="flag" src={props.flag} alt="flag"></img>
    </h2>
      <span>
        <div className="data">Cases:
          <div className="data-cases">{props.cases}</div>
        </div>
        <div className="data">Deaths:
          <div className="data-deaths">{props.deaths}</div>
        </div>
        <div className="data">Recovered:
          <div className="data-recovered">{props.recovered}</div>
        </div>
      </span>
  </>
)
}

export default CountryData;
