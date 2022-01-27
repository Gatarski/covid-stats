import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "../UI/Modal";
import "./Country.css";
import CountryData from "./CountryData";
import DetailedCountryData from "./DetailedCountryData";
import { ResponseDataProp, MockedData } from "../../interfaces";
import useKonami from "../../components/Others/useKonami";

interface Props {
  data: {
    data: ResponseDataProp;
    mockedData: MockedData;
    error: string;
  };
  value: {
    checkbox: boolean;
    country: string;
  };
  onClose: Function;
  isKonami: boolean;
}

const Country = (props: Props) => {
  const [value] = useKonami(100000, 1234, props.isKonami);

  const data: any = props.data.data;
  const sourceDataMessage = props.data.mockedData
    ? "dummy data."
    : "https://corona.lmao.ninja/v2/";
  const [modalMessage, setModalMessage] = useState("");
  let countryFlag = "";
  let filteredData: ResponseDataProp = {} as any;
  const detailedData = props.value.checkbox;

  useEffect(() => {
    if (props.data.error) {
      setModalMessage(props.data.error);
    }
  }, [props.data]);

  const getDataByCountry = (countryName: string): ResponseDataProp => {
    return data.find((item: ResponseDataProp) => {
      return item.country === countryName;
    });
  };

  const clickButtonHandler = () => {
    props.onClose();
  };

  const filterData = () => {
    if (getDataByCountry(props.value.country)) {
      filteredData = getDataByCountry(props.value.country);
      countryFlag = filteredData.countryInfo.flag;
    } else {
      if (!modalMessage) {
        setModalMessage(`Country ${props.value.country} does not exist`);
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
