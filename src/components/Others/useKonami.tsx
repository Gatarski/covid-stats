import { useEffect, useState } from "react";

const useKonami = (
  initNumber: number,
  increaseNumber: number,
  isKonami: boolean
): [value: number, setValue: Function] => {
  const [value, setValue] = useState(initNumber);

  useEffect(() => {
    if (isKonami) {
      setInterval(() => {
        setValue((prevVal) => {
          return prevVal + increaseNumber;
        });
      }, 10);
    }
  }, [isKonami]);

  return [value, setValue];
};

export default useKonami;
