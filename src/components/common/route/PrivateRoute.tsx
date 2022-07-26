import React, { useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../../assets/hooks/context/Global';

const PrivateRoute = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [isAuth, setIsAuth] = useState(!!currentUser);
  // 渡された props をそのまま Route に設定する
  return isAuth ? <Outlet /> : <Navigate to="/sign_in" replace />;
};

export default PrivateRoute;
