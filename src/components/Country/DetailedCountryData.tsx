import "./DetailedCountryData.css";
import { ResponseDataProp } from "../../interfaces";
import useKonami from "../../components/Others/useKonami";

interface Props {
  data: ResponseDataProp;
  isKonami: boolean;
}

const DetailedCountryData = (props: Props) => {
  const [value] = useKonami(100000, 1234, props.isKonami);

  const percentOfCountryPopulation = (number: number) => {
    return `${(number / props.data.population).toFixed(4)} %`;
  };

  return (
    <>
      <h2 className="details-text">More details:</h2>
      <ul className="item-list">
        <li>
          Active cases:
          <p>{!props.isKonami ? props.data.active : value}</p>
        </li>
        <li>
          (currently
          <p>{percentOfCountryPopulation(props.data.active)}</p>
          of country population are sick)
        </li>
        <li>
          Active cases per one million:
          <p>{!props.isKonami ? props.data.activePerOneMillion : value}</p>
        </li>
        <li>
          Deaths per one million:
          <p>{!props.isKonami ? props.data.deathsPerOneMillion : value}</p>
        </li>
        <li>
          Tests:
          <p>{props.data.tests}</p>
        </li>
        <li>
          Tests per one million:
          <p>{props.data.testsPerOneMillion}</p>
        </li>
        <li>
          Today cases:
          <p>{!props.isKonami ? props.data.todayCases : value}</p>
        </li>
        <li>
          Today deaths:
          <p>{!props.isKonami ? props.data.todayDeaths : value}</p>
        </li>
        <li>
          Today recovered:
          <p>{props.data.todayRecovered}</p>
        </li>
      </ul>
    </>
  );
};

export default DetailedCountryData;
