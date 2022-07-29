import React, { useState, FC } from 'react';
import { showMe, User } from 'src/frontend/module/user';

type ContextState = {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<Partial<User>>>;
  notificationCount: number;
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
  alertState: boolean;
  setAlertState: React.Dispatch<React.SetStateAction<boolean>>;
  alertStatus: string;
  setAlertStatus: React.Dispatch<React.SetStateAction<string>>;
  alertText: string;
  setAlertText: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = React.createContext({} as ContextState);

export const GlobalProvider: FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [alertState, setAlertState] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState<string>('');
  const [alertText, setAlertText] = useState<string>('');

  React.useEffect(() => {
    if (!currentUser) {
      const fetchUser = async () => {
        try {
          const user = await showMe();
          setCurrentUser(user);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [currentUser]);

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        notificationCount,
        setNotificationCount,
        alertState,
        setAlertState,
        alertStatus,
        setAlertStatus,
        alertText,
        setAlertText,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
