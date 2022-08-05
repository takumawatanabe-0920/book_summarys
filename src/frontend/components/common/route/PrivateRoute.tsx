import React from 'react';
import { Navigate } from 'react-router-dom';
import { showMe } from 'src/frontend/module/user';
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = React.useState(undefined);

  React.useEffect(() => {
    const load = async () => {
      const user = await showMe();
      setCurrentUser(user);
    };
    load();
  }, []);

  if (!!currentUser) {
    return children;
  }

  return currentUser === null && <Navigate to="/" replace />;
};

export default PrivateRoute;
