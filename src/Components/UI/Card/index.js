import classes from "./style.module.css";

// Common card block to be reused
const Card = (props) => {
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  );
}

export default Card;