import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './ContactData.module.css';
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = (props) => {
    const[loading, setLoading] = useState(false);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[address, setAddress] = useState({
        street:'',
        postalCode:''
    })

    const navigate = useNavigate();

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer:{
                name:'Ishita Anand',
                address: {
                    street:'Teststreet 1',
                    zipCode:'3783',
                    country:'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            setLoading(false);//stop loading because we got our response
            navigate('/');
        })
        .catch(error => {
            setLoading(false);
            
        });
    }

    let form = ( <form>
            <Input inputtype="input" type="text" name="name" placeholder="Your Name"/>
            <Input inputtype="input" type="email" name="email" placeholder="Your Email"/>
            <Input inputtype="input" type="text" name="street" placeholder="Street"/>
            <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>);
    if(loading){
        form = <Spinner/>
    }
    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )

}

export default ContactData;