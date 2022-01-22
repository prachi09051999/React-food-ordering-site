import { Fragment } from 'react';
import MealsSummary from "../MealsSummary/index";
import AvailableMeals from '../AvailableMeals/index';

// Meal Section containing all the sections shown in the page on load related to Meal 
const Meal = () => {
return (
  <Fragment>
    <MealsSummary/>
    <AvailableMeals/>
  </Fragment>
);
}

export default Meal;