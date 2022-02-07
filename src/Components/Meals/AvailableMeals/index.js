import { useEffect, useState } from 'react';
import classes from './style.module.css';
import Card from "../../UI/Card/index";
import MealItem from '../MealItem';

// Showing Meals List available in the page

const AvaiableMeals = () => {

  // maintaining meals state

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);


  // fetching menu dynamically by http request to server

  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('https://react-http-request-proje-bdcd3-default-rtdb.firebaseio.com/Meals.json');

      //checking error
      if(!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();
      const loadedItems = [];
      for(let key in data){
        loadedItems.push({
          id:key,
          name:data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setIsLoading(false);
      setIsError(false);
      setMeals(loadedItems);
    }
      fetchData().catch((error)=> {
        setIsLoading(false);
        setIsError(error.message);
      });
  },[]);

  // Loading state returned jSX

  if(isLoading){
    return (
      <section className={classes.meals}>
        <p className={classes.loading}>Loading...</p>
      </section>
    );
  }

    // error state returned JSX
    if(isError){
      return (
        <section className={classes.meals}>
          <p className={classes.error}>{isError}</p>
        </section>
      );
    }
  
  // Looping thorugh each item of Menu to show on the Page

  const MealList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)
return (
  <section className={classes.meals}>
    <Card>
      <ul>
        {MealList}
      </ul>
    </Card>
  </section>
);
}

export default AvaiableMeals;