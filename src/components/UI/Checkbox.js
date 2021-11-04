import { useState } from 'react/cjs/react.development'
import './Checkbox.css'

const Checkbox = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  const checkboxHandler = () => {
    if (!props.disabled) {
      setIsChecked(!isChecked)
      props.onCheckboxData(isChecked)
    }
  }
 
 return(
   <span onClick={checkboxHandler}>
    <input checked={isChecked} className='checkbox' type='checkbox' disabled={props.disabled}></input>
    {props.message}
  </span>
   
 )
}

export default Checkbox;
