import React, { createContext, useState } from "react";
import axios from 'axios';

export const CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartID, setCartID] = useState();

    const headers = {
        Authorization: `Token ${localStorage.getItem("userToken")}`
    };

    async function addToCart(id) {
        return axios.post(`http://127.0.0.1:8000/api/cart/add/`, {
            item: id,
            quantity: 0
        }, {
            headers: headers
        }).then((res) => res).catch((err) => err);
    }

    async function getCart() {
        return axios.get(`http://127.0.0.1:8000/api/cart/list/`, {
            headers: headers
        }).then((res) => res).catch((err) => err);
    }

    async function deleteCartProduct(id) {
        return axios.delete(`http://127.0.0.1:8000/api/cart/delete/${id}`, {
            headers: headers
        }).then((res) => res).catch((err) => err);
    }

    async function clearCart() {
        return axios.delete(`http://127.0.0.1:8000/api/cart/delete-all/`, {
            headers: headers
        }).then((res) => res).catch((err) => err);
    }

    async function increaseCartProduct(id) {
        return axios.put(`http://127.0.0.1:8000/api/cart/addmore/${id}`, null, {
            headers: headers
        }).then((res) => res.data).catch((err) => {
            throw new Error("Quantity cannot be increased further, exceeds prodStock limit");
        });
    }

    async function decreaseCartProduct(id) {
        return axios.put(`http://127.0.0.1:8000/api/cart/remove/${id}`, null, {
            headers: headers
        }).then((res) => res.data).catch((err) => {
            throw new Error("decrease");
        });
    }

    async function order(values) {
        let data = await axios.post(`http://127.0.0.1:8000/api/order/new/`, values, {
            headers: headers
        }).then((res) => res).catch((err) => err);

        console.log("=>>>", data.data.id);
        setCartID(data.data.id);
    }

    return (
        <CartContext.Provider value={{ addToCart, getCart, deleteCartProduct, increaseCartProduct, decreaseCartProduct, clearCart, order, cartID }}>
            {props.children}
        </CartContext.Provider>
    );
}
