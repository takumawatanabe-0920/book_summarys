import React from 'react';
import { Navigate } from 'react-router-dom';
import { showMe } from 'src/frontend/module/user';

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = React.useState(undefined);

  React.useEffect(() => {
    const load = async () => {
      const user = await showMe();
      setCurrentUser(user);
    };
    load();
  }, []);

  if (currentUser === null) {
    return children;
  }

  return !!currentUser && <Navigate to="/" replace />;
};

export default GuestRoute;
