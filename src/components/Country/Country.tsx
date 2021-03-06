import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "../UI/Modal";
import "./Country.css";
import CountryData from "./CountryData";
import DetailedCountryData from "./DetailedCountryData";
import { ResponseDataProp } from "../../interfaces";
import useKonami from "../../components/Others/useKonami";
import { useSelector } from "react-redux";

interface Props {
  onClose: Function;
  isKonami: boolean;
}

const Country = (props: Props) => {
  const [value] = useKonami(100000, 1234, props.isKonami);
  const data = useSelector((state: any) => state.dataReducer.fetchedData);
  const countryData= useSelector((state: any) => state.dataReducer.userInput)
  const sourceDataMessage = data.mockedData
    ? "dummy data."
    : "https://corona.lmao.ninja/v2/";
  const [modalMessage, setModalMessage] = useState("");
  let countryFlag = "";
  let filteredData: ResponseDataProp = {} as any;
  const detailedData = countryData.checkbox;

  useEffect(() => {
    if (data.error) {
      setModalMessage(data.error);
    }
  }, [data]);

  const getDataByCountry = (countryName: string): ResponseDataProp => {
    return data.find((item: ResponseDataProp) => {
      return item.country === countryName;
    });
  };

  const clickButtonHandler = () => {
    props.onClose();
  };

  const filterData = () => {
    if (getDataByCountry(countryData.country)) {
      filteredData = getDataByCountry(countryData.country);
      countryFlag = filteredData.countryInfo.flag;
    } else {
      if (!modalMessage) {
        setModalMessage(`Country ${countryData.country} does not exist`);
      }
    }
  };

  filterData();
  return (
    <>
      <CountryData
        country={filteredData.country}
        flag={countryFlag}
        cases={!props.isKonami ? filteredData.cases : value}
        deaths={!props.isKonami ? filteredData.deaths : value}
        recovered={filteredData.recovered}
        population={filteredData.population}
      />
      {detailedData && (
        <DetailedCountryData data={filteredData} isKonami={props.isKonami} />
      )}
      <div className="data-info">Data from: {sourceDataMessage}</div>
      {modalMessage && (
        <Modal
          title="Error"
          message={modalMessage}
          onClick={clickButtonHandler}
        ></Modal>
      )}
    </>
  );
};

export default React.memo(Country);
