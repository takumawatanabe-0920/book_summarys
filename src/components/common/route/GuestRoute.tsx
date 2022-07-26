import React, { useState, useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../../assets/hooks/context/Global';

const GuestRoute = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [isAuth, setIsAuth] = useState(!!currentUser);

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
