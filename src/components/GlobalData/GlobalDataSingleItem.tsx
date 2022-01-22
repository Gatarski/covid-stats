interface Props {
  country: string;
  activePerOneMillion: number;
  key: string;
}

const GlobalDataSingleItem = (props: Props) => {
  return (
    <li>
      {props.country}:<p>{props.activePerOneMillion}</p>
    </li>
  );
};

export default GlobalDataSingleItem;
