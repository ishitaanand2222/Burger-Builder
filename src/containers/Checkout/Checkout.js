import React from "react";
import {Route, Routes} from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const checkoutCancelledHandler = () => {
        navigate(-1);
    }

    const checkoutContinuedHandler = () => {
        navigate('/checkout/contact-data');
    }
    return(
        <div>
            <CheckoutSummary 
               ingredients={props.ings}
               checkoutCancelledHandler={checkoutCancelledHandler}
               checkoutContinuedHandler={checkoutContinuedHandler}/>
               {console.log(location.pathname)};
               <Routes>
                 <Route 
                  path={'contact-data'}
                  element={<ContactData/>}/>
               </Routes>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);