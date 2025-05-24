import React, {createContext, useState, useContext} from 'react'

const UserContext = createContext(); 

export const useUser = () => useContext(UserContext); 

export const UserProvider = ({children}) =>{
    const [names, setNames] = useState('')

    const setUser = (name) => {
    setNames(name);
  };

  return (
    <UserContext.Provider value={{ names, setUser }}>
      {children}
    </UserContext.Provider>
  );
}