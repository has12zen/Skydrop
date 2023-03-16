import { useState, useEffect } from 'react';

import { useNavigate, useRoutes } from 'react-router-dom';

import passProps from './routes';
import './App.css';

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

  return <div className="App">{routing}</div>;
};

export default App;
