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
                value:''
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:''
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:''
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value:''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:''
            }
    })
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
            // customer:{
            //     name:'Ishita Anand',
            //     address: {
            //         street:'Teststreet 1',
            //         zipCode:'3783',
            //         country:'India'
            //     },
            //     email: 'test@test.com'
            // },
            // deliveryMethod: 'fastest'
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

    const formElementsArray = [];
    for(let key in orderForm){
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = ( 
        <form>
            {formElementsArray.map( formElement => (
                <Input 
                   key = {formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig = {formElement.config.elementConfig}
                   value = {formElement.config.value}/>
            ))}
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
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