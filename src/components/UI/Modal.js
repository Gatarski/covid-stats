import React from "react";
import ReactDOM from 'react-dom';
import Button from "./Button";
import './Modal.css'


const Backdrop = () => {
  return <div className='backdrop'></div>
}

const Overlay = (props) => {
  return (
    <div className='modal'>
      <header className='header'>
        <h2>{props.title}</h2>
      </header>
      <div>
        <p>{props.message}</p>
      </div>
      <footer className='actions'>
        <Button onClick={props.onClick}>Okay</Button>
      </footer>
    </div>
  )
}

const Modal = (props) => {
  return(
    <>
       {ReactDOM.createPortal(<Backdrop/>, document.getElementById('backdrop-id'))}
       {ReactDOM.createPortal(<Overlay title={props.title} message={props.message} onClick={props.onClick}/>, document.getElementById('overlay-id'))}
    </>
  )
}

export default Modal;
