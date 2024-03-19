import React, { createContext, useEffect ,useState } from "react";
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

    const [total_items_FAV, settotal_items_FAV] = useState(null)
 
    async function getInitialFAVtNumber() {

        let { data } = await getFavorite()

        settotal_items_FAV(data.total_items_FAV)

    }

    useEffect(() => {
        getInitialFAVtNumber()
    }, [])


    return (

        <FavoriteContext.Provider value={{ addToFavorite, getFavorite, deleteFavoriteProduct , total_items_FAV, settotal_items_FAV }}>
            {props.children}

        </FavoriteContext.Provider>
    );
}
