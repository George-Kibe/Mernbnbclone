import { useState, useEffect, createContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    const token = localStorage.getItem("token")
    
    useEffect(() => {
      
      if (token){
        const decoded = jwt_decode(token);
        setUser(decoded)
        setReady(true)
      }
    }, [token])
    

    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}