import React, { createContext } from "react";
import axios from 'axios';

export  const FavoriteContext = createContext();

const headers = {
    Authorization: `Token ${localStorage.getItem("userToken")}`
};

function addToFavorite(id) {
    return axios.post(`http://127.0.0.1:8000/api/favourit/add-to-favorite/${id}/`, {}, {
        headers: headers
    }).then((res) => res).catch((err) => err);
}

function getFavorite() {
    return axios.get(`http://127.0.0.1:8000/api/favourit/user-favorite/`, {
        headers: headers
    }).then((res) => res).catch((err) => err)
}

function deleteFavoriteProduct(id) {
    return axios.delete(`http://127.0.0.1:8000/api/favourit/remove-from-favorite/${id}/`, {
        headers: headers
    }).then((res) => res).catch((err) => err);
}

export default function FavoriteContextProvider(props) {
    return (
        <FavoriteContext.Provider value={{ addToFavorite, getFavorite, deleteFavoriteProduct }}>
            {props.children}
        </FavoriteContext.Provider>
    );
}
