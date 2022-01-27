import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Konami.css";
import gameOver from "../../assets/images/game.png";

const konamiPattern = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

interface KonamiProps {
  isKonami: Function;
}

const Konami = (props: KonamiProps) => {
  const [isKonami, setIsKonami] = useState(false);

  useEffect(() => {
    const keyPressed: string[] = [];
    document.addEventListener("keydown", (key) => {
      if (keyPressed.length >= 10) {
        keyPressed.shift();
      }
      keyPressed.push(key.key);
      if (JSON.stringify(keyPressed) === JSON.stringify(konamiPattern)) {
        setIsKonami(true);
        props.isKonami(true);
      }
    });
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={!isKonami ? "" : "konami"}></div>,
        document.getElementById("backdrop-id") as HTMLElement
      )}
      {isKonami ? (
        <div className="game-over">
          <img src={gameOver} alt="game-over"></img>
        </div>
      ) : null}
    </>
  );
};

export default Konami;
