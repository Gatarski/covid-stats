const GlobalDataSingleItem = (props) => {
  return(
    <li>{props.country}: 
       <p>{props.activePerOneMillion}</p>
    </li>)
}

export default GlobalDataSingleItem;
