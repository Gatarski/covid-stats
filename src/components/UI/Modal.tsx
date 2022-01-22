import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import "./Modal.css";

interface OverlayProps {
  title: string;
  message: string;
  onClick: Function;
}

interface ModalProps {
  title: string;
  message: string;
  onClick: Function;
}

const Backdrop = () => {
  return <div className="backdrop"></div>;
};

const Overlay = (props: OverlayProps) => {
  return (
    <div className="modal">
      <header className="header">
        <h2>{props.title}</h2>
      </header>
      <div>
        <p>{props.message}</p>
      </div>
      <footer className="actions">
        <Button onClick={props.onClick}>Okay</Button>
      </footer>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-id") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          onClick={props.onClick}
        />,
        document.getElementById("overlay-id") as HTMLElement
      )}
    </>
  );
};

export default Modal;
