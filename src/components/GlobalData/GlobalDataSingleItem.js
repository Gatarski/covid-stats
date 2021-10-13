const GlobalDataSingleItem = (props) => {
  return(
    <li key={props.country}>{props.country}: 
       <p>{props.activePerOneMillion}</p>
    </li>)
}

export default GlobalDataSingleItem;
