import { createContext, useState } from "react";


export let TokenContext = createContext();

export default function TokenContextProvider(props){
    const [token,setToken] = useState(null)
    const [userData,setUserData] = useState({})
    const [userRole,setUserRole] = useState(null)
    return(
        <>
        
        <TokenContext.Provider value={{token,setToken,userData,setUserData,userRole,setUserRole}}>
        {props.children}
        </TokenContext.Provider>
        </>
    )
} 



