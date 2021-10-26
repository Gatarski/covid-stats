const Checkbox = (props) => {
  const checkboxHandler = (event) => {
    props.onCheckboxData(event.target.checked)
  }
 
 return(
   <span>
    <input onClick={checkboxHandler} className="checkbox" type="checkbox" disabled={props.disabled}></input>
    {props.message}
  </span>
   
 )
}

export default Checkbox;
