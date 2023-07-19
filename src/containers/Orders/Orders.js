import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = () => {

    const[orders, setOrders] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/orders.json')
        .then((response) => {
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            setLoading(false);
            setOrders(fetchedOrders);
        })
        .catch((err) => {
            setLoading(false);
        })
    },[])
     
    return(
        <div>
            <Order/>
            <Order/>
        </div>
    )
}

export default withErrorHandler(Orders, axios);

