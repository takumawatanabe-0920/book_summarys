import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../../../assets/hooks/context/Global';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [isAuth, setIsAuth] = useState(!!currentUser);

  if (isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return children;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
