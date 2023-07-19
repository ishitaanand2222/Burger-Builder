import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const BurgerBuilder = () =>{

    const[ingredients,setIngredients] = useState(null);
    const[totalPrice, setTotalPrice] = useState(4);
    const[purchasable, setPurchasable] = useState(false);
    const[purchasing, setPurchasing] = useState(false);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        axios.get('https://react-my-burger-7fa95-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
            setIngredients(response.data);
        })
        .catch(error => setError(true));
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
        const oldCount = ingredients[type];
        const updateCount = oldCount+1;
        const updatedIngredients = {
            ...ingredients
        };

        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice + priceAddition;
        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);
        updatePurchaseState(updatedIngredients);
    }

    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        if(oldCount <=0 ){
            return;
        }
        const updateCount = oldCount-1;
        const updatedIngredients = {
            ...ingredients
        }

        updatedIngredients[type] = updateCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice  - priceDeletion;
        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);
        updatePurchaseState(updatedIngredients);
    }

    const purchaseHandler = () =>{
        setPurchasing(true)
    }

    const purchaseCancelHandler = () =>{
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        // alert('You continue !');
        // setLoading(true);
        // const order = {
        //     ingredients: ingredients,
        //     price: totalPrice,
        //     customer:{
        //         name:'Ishita Anand',
        //         address: {
        //             street:'Teststreet 1',
        //             zipCode:'3783',
        //             country:'India'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        // .then(response => {
        //     setLoading(false);
        //     setPurchasing(false);//stop loading because we got our response
        // })
        // .catch(error => {
        //     setLoading(false);
        //     setPurchasing(false);
        // });
        navigate("/checkout");
    }
    
    const disabledInfo = {
        ...ingredients
    }

    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p>:<Spinner/>

    if(ingredients){
        burger = (
            <Auxillary>
                <Burger ingredients={ingredients}/>
                    <BuildControls
                    ingredientAdded = {addIngredientHandler}
                    ingredientRemoved = {removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {purchasable}
                    ordered = {purchaseHandler}
                    price = {totalPrice}/>
            </Auxillary>
        )
        orderSummary = <OrderSummary 
        ingredients={ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
