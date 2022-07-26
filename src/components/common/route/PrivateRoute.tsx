import React, { useState, useContext } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { GlobalContext } from '../../../assets/hooks/context/Global';

const PrivateRoute = (props: RouteProps) => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [isAuth, setIsAuth] = useState(!!currentUser);
  // 渡された props をそのまま Route に設定する
  return isAuth ? <Route {...props} /> : <Navigate to="/sign_in" replace />;
};

export default PrivateRoute;
