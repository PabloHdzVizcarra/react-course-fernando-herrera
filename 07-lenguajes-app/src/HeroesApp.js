import React, { useReducer, useEffect } from 'react'
import { AppRouter } from './router/AppRouter'
import { authReducer } from './auth/authReducer';
import { AuthContext } from './auth/AuthContext';


export const HeroesApp = () => {
  
  const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false };
  }
  
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{user, dispatch}}>
      
      <AppRouter />

    </AuthContext.Provider>
  )
}

