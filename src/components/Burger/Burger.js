import React from "react";
import classes from './Burger.module.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    console.log(props);
    console.log("props.ingredients:", props.ingredients);

    let transformedIngredients = Object.keys( props.ingredients )//extract keys from a given object and converts them into array
    .map(igKey => {
        const ingredientCount = [...Array(props.ingredients[igKey])];
        console.log("ingredientCount:", ingredientCount);

        return [...Array(props.ingredients[igKey])].map((_,i) => {
            console.log("heyoo !")
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    },[]);

    console.log("[Burger.js] hii")
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients !</p>
    }


    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;