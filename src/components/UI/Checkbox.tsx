import { useState } from "react";
import "./Checkbox.css";

interface Props {
  disabled: boolean;
  message: string;
  onCheckboxData: Function;
}

const Checkbox = (props: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxHandler = () => {
    if (!props.disabled) {
      setIsChecked(!isChecked);
      props.onCheckboxData(isChecked);
    }
  };

  return (
    <span onClick={checkboxHandler}>
      <input
        checked={isChecked}
        className="checkbox"
        type="checkbox"
        disabled={props.disabled}
      ></input>
      {props.message}
    </span>
  );
};

export default Checkbox;
