import React from 'react';
import './Button.css'

interface Props {
  type?: any,
  onClick?: any,
  disabled?: boolean,
  children?: any,
  className?: string,
}

const Button = (props: Props) => {
  const classes = `${props.className} button`

  return (
    <button className={classes} onClick={props.onClick} 
      type={props.type ? props.type : 'submit'} disabled={props.disabled}>{props.children}
      </button>
  )
};

export default React.memo(Button);
