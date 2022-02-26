import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../UI/Button";
import Checkbox from "../UI/Checkbox";
import Dropdown from "../UI/Dropdown";
import "./UserDataRequest.css";
import { CountryData, ResponseDataProp } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";

const UserDataRequest = () => {
  const dispatch = useDispatch();
  const data: ResponseDataProp[] = useSelector((state: any) => state.dataReducer.fetchedData);
  const [btnDisabled, setBtnDisabled] = useState({
    btnDisabled: true,
    error: false,
  });
  const [countryData, setCountryData] = useState<CountryData>({
    country: "",
    checkbox: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dataFromCountryInputHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCountryData((prevVal) => {
      return { ...prevVal, country: event.target.value };
    });

    if (event.target.value.length > 1 && data.length) {
      setBtnDisabled({ btnDisabled: false, error: false });
      setIsDropdownOpen(true);
    } else {
      setBtnDisabled({ btnDisabled: true, error: true });
      setIsDropdownOpen(false);
    }
  };
  const getCheckboxHandler = () => {
    setIsChecked(!isChecked);
  };
  const clickHandler = (event: FormEvent) => {
    event.preventDefault();
    countryData.checkbox = isChecked;
    setCountryData((prevVal) => {
      return { ...prevVal, checkbox: isChecked };
    });
    dispatch({ type: "USER_INPUT", payload: countryData })
    clearInputs();
  };

  const clearInputs = () => {
    setCountryData((prevVal) => {
      return { ...prevVal, country: "" };
    });
    setBtnDisabled({ btnDisabled: true, error: false });
    setIsDropdownOpen(false);
  };

  const countryNameFromDropdown = (countryName: string) => {
    setCountryData((prevVal) => {
      return { ...prevVal, country: countryName };
    });
    setIsDropdownOpen(false);
  };

  const inputCountryCSSClass = !btnDisabled.error
    ? "input-country"
    : "input-country invalid-input";

  return (
    <form onSubmit={clickHandler}>
      <div className="input">
        <input
          className={inputCountryCSSClass}
          placeholder="Select country"
          type="text"
          value={countryData.country}
          onChange={dataFromCountryInputHandler}
        ></input>
        {btnDisabled.error && (
          <div className="error">Type at least 2 chars</div>
        )}
        {isDropdownOpen && (
          <Dropdown
            userInput={countryData.country}
            onCountryName={countryNameFromDropdown}
          ></Dropdown>
        )}
      </div>
      <div>
        <Checkbox
          disabled={btnDisabled.btnDisabled}
          onCheckboxData={getCheckboxHandler}
          message="Show more detailed data"
        ></Checkbox>
      </div>
      <Button className="btn" disabled={btnDisabled.btnDisabled} type="submit">
        Send
      </Button>
    </form>
  );
};

export default UserDataRequest;
