import React, { useEffect, useState } from "react";
import {Route, Routes} from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = () => {
    const[ingredients, setIngredients] = useState({});
    const[price, setPrice] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        setIngredients(ingredients);
        setPrice(price);
    },[])

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
               {console.log(location.pathname)};
               <Routes>
                 <Route 
                  path={'contact-data'}
                  element={<ContactData ingredients={ingredients} price={price}/>}/>
               </Routes>
        </div>
    )
}

export default Checkout;