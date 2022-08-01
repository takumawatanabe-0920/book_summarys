import React, { useContext } from 'react';
import { GlobalContext } from '../../../hooks/context/Global';

const Alert = () => {
  const { alertState, alertStatus, alertText } = useContext(GlobalContext);

  return (
    <>
      {alertState && (
        <div
          className={[
            'alertContainer',
            alertStatus && alertStatus === 'success' ? 'success' : 'danger',
          ].join(' ')}
        >
          <p className="alert_txt">{alertText}</p>
        </div>
      )}
    </>
  );
};

export default Alert;
