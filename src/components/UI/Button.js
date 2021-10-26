import React from 'react';
import './Button.css'

const Button = (props) => {
  const classes = `${props.className} button`

  return (
    <button className={classes} onClick={props.onClick} 
      type={props.type ? props.type : 'submit'} disabled={props.disabled}>{props.children}
      </button>
  )
};

export default React.memo(Button);
