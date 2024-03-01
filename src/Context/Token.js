import { createContext, useState } from "react";


export let TokenContext = createContext();

export default function TokenContextProvider(props){
    const [token,setToken] = useState(null)
    const [userData,setUserData] = useState({})
    return(
        <>
        
        <TokenContext.Provider value={{token,setToken,userData,setUserData}}>
        {props.children}
        </TokenContext.Provider>
        </>
    )
} 



