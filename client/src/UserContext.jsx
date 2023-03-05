import { useState, useEffect, createContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
      if (!user) {
        axios.get("/users/profile")
      }

      const token = localStorage.getItem("token")
      const decoded = jwt_decode(token);
      setUser(decoded)
      console.log(decoded);
    }, [])
    

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}