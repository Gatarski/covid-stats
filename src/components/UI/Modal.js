import Button from "./Button";
import './Modal.css'

const Modal = (props) => {
  return (
    <div>
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
    </div>
  )
}

export default Modal;
