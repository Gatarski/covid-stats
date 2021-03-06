import UserDataRequest from "./components/UserDataRequest/UserDataRequest";
import Country from "./components/Country/Country";
import Konami from "./components/Others/Konami";
import GlobalData from "./components/GlobalData/GlobalData";
import covidImage from "./assets/images/covid-19.png";
import "./App.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const App = () => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isKonami, setIsKonami] = useState(false);
  const countryData = useSelector((state: any) => state.dataReducer.userInput)
  
  useEffect(() => {
    if (countryData.country) {
      setIsCountryOpen(true);
    }
    
  }, [countryData])

  const closeCountryData = () => {
    setIsCountryOpen(false);
  };

  const currentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };

  return (
    <>
      <Konami isKonami={setIsKonami}></Konami>
      <div className={!isKonami ? "image" : "image rotate"}>
        <img src={covidImage} alt="covid-19"></img>
      </div>
      <div className="main-app">
        <h2>Covid stats ({currentDate()})</h2>
        <UserDataRequest />
        {isCountryOpen && (
          <Country
            onClose={closeCountryData}
            isKonami={isKonami}
          />
        )}
      </div>
      <div className="global-data">
        <GlobalData isKonami={isKonami}></GlobalData>
      </div>
    </>
  );
};

export default App;
