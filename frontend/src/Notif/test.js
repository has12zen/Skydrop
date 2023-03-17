import React, { useState } from 'react';
import { fetchToken, onMessageListener } from '../db';
import { Snackbar , Button, Alert } from '@mui/material'


const NotifTest = ({ user, setUser }) => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener().then(payload => {
    setNotification({ title: payload.notification.title, body: payload.notification.body })
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  const onShowNotificationClicked = () => {
    setNotification({ title: "Notification", body: "This is a test notification" })
    setShow(true);
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%' }}>
        <Snackbar open={show} autoHideDuration={6000} onClose={() => setShow(false)}>
            <Alert onClose={() => setShow(false)} severity="success" sx={{ width: '100%' }}>
                {notification.body}
            </Alert>
        </Snackbar>
        <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img  className="App-logo" alt="logo" />
        <Button onClick={() => onShowNotificationClicked()}>Show Toast</Button>
      </header>
    </div>
  );
};

export {NotifTest};
