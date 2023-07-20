import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './ContactData.module.css';
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = (props) => {

    const[orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'',
                valid: false
            }
    })
    const[loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const orderHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = {};
        for(let formUniqueIdentifier in orderForm){
            console.log("heyy"+formUniqueIdentifier);
            formData[formUniqueIdentifier] = orderForm[formUniqueIdentifier].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData
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

    const checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid;
        }

        return isValid;
    }

    const inputChangeHandler = (event, id) => {
        const updatedOrderForm = {...orderForm};
        const updatedOrderEle = {...updatedOrderForm[id]};
        updatedOrderEle.value = event.target.value;
        updatedOrderEle.valid = checkValidity(updatedOrderEle.value, updatedOrderEle.validation)
        updatedOrderForm[id] = updatedOrderEle;
        console.log(updatedOrderEle);
        setOrderForm(updatedOrderForm);
    }

    const formElementsArray = [];
    for(let key in orderForm){
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = ( 
        <form onSubmit={orderHandler}>
            {formElementsArray.map( formElement => (
                <Input 
                   key = {formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig = {formElement.config.elementConfig}
                   value = {formElement.config.value}
                   changed = {(event) => {inputChangeHandler(event,formElement.id)}}/>
            ))}
            <Button btnType="Success">ORDER</Button>
        </form>
    );
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