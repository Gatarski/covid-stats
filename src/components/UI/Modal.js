import React from "react";
import Button from "./Button";
import './Modal.css'

const Modal = (props) => {
  return (
    <React.Fragment>
      <div className='backdrop'></div>
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
    </React.Fragment>
  )
}

export default Modal;
