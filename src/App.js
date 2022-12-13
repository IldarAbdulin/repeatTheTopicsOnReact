import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context';
import { AppRouter } from './routes/AppRouter';


export function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    }
  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
