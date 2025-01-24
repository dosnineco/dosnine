import React, { useEffect } from 'react';

function Notification({ error, notification }) {
  const [showError, setShowError] = React.useState(!!error);
  const [showNotification, setShowNotification] = React.useState(!!notification);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const errorTimeout = setTimeout(() => setShowError(false), 5000); // Hide after 5 seconds
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      const notificationTimeout = setTimeout(() => setShowNotification(false), 5000); // Hide after 5 seconds
      return () => clearTimeout(notificationTimeout);
    }
  }, [notification]);

  return (
    <div>
      {showError && (
        <div className="bg-red-500 text-inherit p-2  mb-4 ">
          {error}
        </div>
      )}
      {showNotification && (
        <div className="bg-green-500 text-inherite p-2  mb-4 ">
          {notification}
        </div>
      )}
    </div>
  );
}

export default Notification;