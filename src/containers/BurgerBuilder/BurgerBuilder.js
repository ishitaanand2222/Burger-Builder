import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


const BurgerBuilder = (props) =>{
    console.log('Inside world');


    console.log("[BurgerBuilder.js]", props.ings);

    const[totalPrice, setTotalPrice] = useState(4);
    const[purchasable, setPurchasable] = useState(false);
    const[purchasing, setPurchasing] = useState(false);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        // axios.get('https://react-my-burger-7fa95-default-rtdb.firebaseio.com/ingredients.json')
        // .then(response => {
        //     setIngredients(response.data);
        // })
        // .catch(error => setError(true));
    },[])


    const updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el) => {
                return sum+el;
            }, 0);
        
        setPurchasable(sum > 0)
    }

    
    const addIngredientHandler = (type) =>{
        const oldCount = props.ings[type];
        const updateCount = oldCount+1;
        const updatedIngredients = {
            ...props.ings
        };

        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice + priceAddition;
        setTotalPrice(newPrice);
        //setIngredients(updatedIngredients);
        updatePurchaseState(updatedIngredients);
    }

    const removeIngredientHandler = (type) => {
        const oldCount = props.ings[type];
        if(oldCount <=0 ){
            return;
        }
        const updateCount = oldCount-1;
        const updatedIngredients = {
            ...props.ings
        }

        updatedIngredients[type] = updateCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice  - priceDeletion;
        setTotalPrice(newPrice);
        //setIngredients(updatedIngredients);
        updatePurchaseState(updatedIngredients);
    }

    const purchaseHandler = () =>{
        setPurchasing(true)
    }

    const purchaseCancelHandler = () =>{
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in props.ings){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(props.ings[i]));
        }
        queryParams.push('price=' + totalPrice);
        const queryString = queryParams.join('&');

        navigate(`/checkout?${queryString}`);
    }
    
    const disabledInfo = {
        ...props.ings
    }

    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p>:<Spinner/>

    if(props.ings){
        burger = (
            <Auxillary>
                <Burger ingredients={props.ings}/>
                    <BuildControls
                        ingredientAdded = {props.onIngredientAdded}
                        ingredientRemoved = {props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchasable = {purchasable}
                        ordered = {purchaseHandler}
                        price = {totalPrice}/>
            </Auxillary>
        )
        orderSummary = <OrderSummary 
        ingredients={props.ings}
        purchaseCancelled = {purchaseCancelHandler}
        purchaseContinued = {purchaseContinueHandler}
        price = {totalPrice}/>
    }

    if(loading){
        orderSummary = <Spinner />
        }
    return(
        <Auxillary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
                {burger}
        </Auxillary>
    );

    
}


const mapStateToProps = state => {
    return{
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
