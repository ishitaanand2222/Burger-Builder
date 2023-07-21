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

const BurgerBuilder = (props) =>{
    console.log('Inside world');


    console.log("[BurgerBuilder.js]", props.ings);

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
        
        return (sum > 0)
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
        queryParams.push('price=' + props.price);
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
                        purchasable = {updatePurchaseState(props.ings)}
                        ordered = {purchaseHandler}
                        price = {props.price}/>
            </Auxillary>
        )
        orderSummary = <OrderSummary 
        ingredients={props.ings}
        purchaseCancelled = {purchaseCancelHandler}
        purchaseContinued = {purchaseContinueHandler}
        price = {props.price}/>
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
