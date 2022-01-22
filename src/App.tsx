import UserDataRequest from "./components/UserDataRequest/UserDataRequest";
import Country from "./components/Country/Country";
import GlobalData from "./components/GlobalData/GlobalData";
import covidImage from "./assets/images/covid-19.png";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [inputData, setInputData] = useState<any>({});
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [data, setData] = useState<any>({ data: [] });

  const dataFromInputsHandler = (dataFromInputs: string) => {
    setIsCountryOpen(true);
    setInputData(dataFromInputs);
  };

  const closeCountryData = () => {
    setIsCountryOpen(false);
  };

  const currentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };

  return (
    <>
      <div className="image">
        <img src={covidImage} alt="covid-19"></img>
      </div>
      <div className="main-app">
        <h2>Covid stats ({currentDate()})</h2>
        <UserDataRequest onData={dataFromInputsHandler} data={data} />
        {isCountryOpen && (
          <Country value={inputData} onClose={closeCountryData} data={data} />
        )}
      </div>
      <div className="global-data">
        <GlobalData onGetData={setData}></GlobalData>
      </div>
    </>
  );
};

export default App;
