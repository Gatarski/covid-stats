import useKonami from "../../components/Others/useKonami";
interface Props {
  country: string;
  activePerOneMillion: number;
  key: string;
  isKonami: boolean;
}

const GlobalDataSingleItem = (props: Props) => {
  const [value] = useKonami(props.activePerOneMillion, 10000, props.isKonami);

  return (
    <li>
      {props.country}:<p>{value.toFixed(2)}</p>
    </li>
  );
};

export default GlobalDataSingleItem;
