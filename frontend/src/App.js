import { useState, useEffect } from 'react';

import { useNavigate, useRoutes } from 'react-router-dom';

import passProps from './routes';
import './App.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './constants';

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const routes = passProps(user, updateUser);
  const routing = useRoutes(routes);

  useEffect(() => {
    console.log({ user });

    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="App">{routing}</div>;
    </GoogleOAuthProvider>
  );
};

export default App;
