import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
    const[ingredients, setIngredients] = useState({
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
    })

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const ingredients = {};
        for(let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        setIngredients(ingredients);
    })
    const checkoutCancelledHandler = () => {
        navigate(-1);
    }

    const checkoutContinuedHandler = () => {
        navigate('/checkout/contact-data');
    }
    return(
        <div>
            <CheckoutSummary 
               ingredients={ingredients}
               checkoutCancelledHandler={checkoutCancelledHandler}
               checkoutContinuedHandler={checkoutContinuedHandler}/>
        </div>
    )
}

export default Checkout;