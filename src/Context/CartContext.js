import { createContext } from "react";
import axios from 'axios';


export let CartContext = createContext();



let headers = {
    Authorization: `Token ${localStorage.getItem("userToken")}`
};

function addToCart(id) {
   

    return axios.post(`http://127.0.0.1:8000/api/cart/add/`, {
        item: id,
        quantity: 0
    }, {
        headers: headers
    }).then((res) => res).catch((err) => err);
}

function getCart() {

    return axios.get(`http://127.0.0.1:8000/api/cart/list/`, {
        headers: headers
    }
    ).then((res) => res).catch((err) => err)
}

function deleteCartProduct(id) {
    return axios.delete(`http://127.0.0.1:8000/api/cart/delete/${id}`, {
        headers: headers
    }).then((res) => res).catch((err) => err);
}



function clearCart() {


    return axios.delete(`http://127.0.0.1:8000/api/cart/delete-all/`, { 
        headers: headers
    }
    ).then((res) => res).catch((err) => err)
}

function increaseCartProduct(id) {
    return axios.put(`http://127.0.0.1:8000/api/cart/addmore/${id}`, null, {
        headers: headers
    }).then((res) => res.data).catch((err) => {
        throw new Error("Quantity cannot be increased further, exceeds prodStock limit");
    });
}

function decreaseCartProduct(id)  {
    return axios.put(`http://127.0.0.1:8000/api/cart/remove/${id}`, null, { 
        headers: headers
    }).then((res) => res.data).catch((err) => {
        throw new Error("decrease");
    });
}



export default function CartContextProvider(props) {

    return <CartContext.Provider value={{ addToCart, getCart, deleteCartProduct, increaseCartProduct, decreaseCartProduct,clearCart }}>
        {props.children}
    </CartContext.Provider>
}