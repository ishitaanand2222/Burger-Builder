import React, { useState } from "react";
import classes from './ContactData.module.css';
import Button from "../../../components/UI/Button/Button";

const ContactData = () => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[address, setAddress] = useState({
        street:'',
        postalCode:''
    })


    return(
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success">ORDER</Button>
            </form>
        </div>
    )

}

export default ContactData;