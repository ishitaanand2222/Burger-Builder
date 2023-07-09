import React from "react";
import Auxillary from "../../../hoc/Auxillary";


const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>
                    : {props.ingredients[igKey]}
                </li>)
        })
    return(
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
        </Auxillary>
    )
};


export default OrderSummary;