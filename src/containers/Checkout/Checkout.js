import React, { useState } from "react";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
    const[ingredients, setIngredients] = useState({
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
    })
    return(
        <div>
            <CheckoutSummary ingredients={ingredients}/>
        </div>
    )
}

export default Checkout;