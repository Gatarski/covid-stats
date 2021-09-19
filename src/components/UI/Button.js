import './Button.css'

const Button = (props) => {
  const classes = `${props.className} button`

  return (
    <button className={classes} onClick={props.onClick} 
      disabled={props.disabled}>{props.children}
      </button>
  )
};

export default Button;
