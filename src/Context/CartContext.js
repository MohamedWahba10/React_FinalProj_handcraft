import { createContext } from "react";
import axios from 'axios';


let CartContext = createContext();


let headers = {

    token: localStorage.getItem("userToken")
}
function addToCart(id) {

    console.log("leoooooo leoooo");

    return axios.post(" API el wa2eef 3ala KHaled beihh ", {
        productid: id
    }, {
        headers: headers
    }
    ).then((res) => res).catch((err) => err)
}

function getCart() {


    return axios.get(" API el wa2eef 3ala KHaled beihh ", {
        headers: headers
    }
    ).then((res) => res).catch((err) => err)
}

function deleteCartProduct(id) {


    return axios.delete(`API el wa2eef 3ala KHaled beihh/${id}`, {
        headers: headers
    }
    ).then((res) => res).catch((err) => err)
}

function clearCart() {


    return axios.delete(`API el wa2eef 3ala KHaled beihh`, {
        headers: headers
    }
    ).then((res) => res).catch((err) => err)
}


function updateCartProduct(id, count) {



    return axios.put(`API el wa2eef 3ala KHaled beihh/${id}`, {
        productid: id
    },
        {
            count: count
        },
        {
            headers: headers
        }
    ).then((res) => res).catch((err) => err)
}

export default function CartContextProvider(props) {

    return <CartContext.Provider value={{ addToCart, getCart, deleteCartProduct, updateCartProduct ,clearCart }}>
        {props.children}



    </CartContext.Provider>
}