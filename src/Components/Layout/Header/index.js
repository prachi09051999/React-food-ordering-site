import { Fragment } from 'react';
import mealImage from "../../../assets/meals.jpeg";
import classes from "./style.module.css";
import HeaderCartButton from "../HeaderCartButton/index";

const Header = (props) => {
return (
  <Fragment>
      {/* Main header Element */}
    <header className={classes.header}>
      <h1>Chinese Food</h1>
      <HeaderCartButton onOpen={props.onOpen}/>
    </header>

    {/* Section showing Image attached to header */}
    <div className={classes['main-image']}>
      <img src={mealImage} alt="A Table full of delicious food"/>
    </div>
  </Fragment>
);
}

export default Header;