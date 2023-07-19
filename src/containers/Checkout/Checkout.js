import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
    const[ingredients, setIngredients] = useState({
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
    })

    const navigate = useNavigate();

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