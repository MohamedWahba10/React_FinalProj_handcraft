import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const CartContext = createContext();



const headers = {
    Authorization: `Token ${localStorage.getItem("userToken")}`
};

 function addToCart(id) {

    return axios.post(`http://127.0.0.1:8000/api/cart/add/`, {
        item: id,
        quantity: 0
    }, {
        headers: headers
    }).then((res) => {
      
        return res;
    }).catch((err) => err);
}


function getCart() {
    return axios.get(`http://127.0.0.1:8000/api/cart/list/`, {
        headers: headers
    }).then((res) => res).catch((err) => err);
}

function deleteCartProduct(id) {
    return axios.delete(`http://127.0.0.1:8000/api/cart/delete/${id}`, {
        headers: headers
    }).then((res) => res).catch((err) => err);
}

function clearCart() {
    return axios.delete(`http://127.0.0.1:8000/api/cart/delete-all/`, {
        headers: headers
    }).then((res) => res).catch((err) => err);
}

function increaseCartProduct(id) {
    return axios.put(`http://127.0.0.1:8000/api/cart/addmore/${id}`, null, {
        headers: headers
    }).then((res) => res.data).catch((err) => {
        throw new Error("Quantity cannot be increased further, exceeds prodStock limit");
    });
}

function decreaseCartProduct(id) {
    return axios.put(`http://127.0.0.1:8000/api/cart/remove/${id}`, null, {
        headers: headers
    }).then((res) => res.data).catch((err) => {
        throw new Error("decrease");
    });
}



export default function CartContextProvider(props) {

    const [cartID, setCartID] = useState();
    const [total_items_count, settotal_items_count] = useState(0)

    async function order(values) {

        let data = await axios.post(`http://127.0.0.1:8000/api/order/new/`, values, {
            headers: headers
        }).then((res) => res).catch((err) => err);

        console.log("=>>>", data.data.id);
        setCartID(data.data.id);
    }

    function handle_payment_success() {
        return axios.post(` http://127.0.0.1:8000/api/order/handle-payment-success/`, null, {
            headers: headers
        }).then((res) => res.data).catch((err) => {
            throw new Error("error");
        });
    }
    
   


    async function getInitialCartNumber() {
        try {
            const response = await getCart();
            if (response && response.data) {
                settotal_items_count(response.data.total_items_count);
            } else {
                console.error("Invalid response from getCart:", response);
            }
        } catch (error) {
            console.error("Error while fetching initial cart number:", error);
        }
    }
    
    useEffect(() => {
        getInitialCartNumber()
    }, [])

    return (

        <CartContext.Provider value={{ addToCart, getCart, deleteCartProduct, increaseCartProduct, decreaseCartProduct, clearCart, order, cartID, total_items_count, settotal_items_count , handle_payment_success }}>
            {props.children}
        </CartContext.Provider>
    );
}
