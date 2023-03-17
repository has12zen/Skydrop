import { Navigate } from 'react-router-dom';

import Layout from './Layout';
import Login from './Login';
import Dashboard from './Dashboard';

import { DefaultMap } from './Components/Map';
import { LiveMap } from './Components/Map/liveMap';
import { NotifTest } from './Notif/test';

import DashHome from './Dashboard/Components/Home';
import Current from './Dashboard/Components/Currents';
import History from './Dashboard/Components/History';
import MasterMap from './Dashboard/Components/MasterMap';

import UserHome from './pages/user/Home';
import RequestPickup from './pages/user/RequestPickup';
import UserHistory from './pages/user/History';

const passProps = (user, setUser) => {
  if (user?.admin)
    return [
      {
        path: '/',
        element: <Layout user={user} setUser={setUser} />,
        children: [
          {
            path: '',
            element: <Dashboard user={user} setUser={setUser} />,
            children: [
              {
                path: '',
                element: <DashHome />,
              },
              {
                path: 'currents',
                element: <Current />,
              },
              {
                path: 'history',
                element: <History />,
              },
              {
                path: 'map',
                element: <MasterMap />,
              },
              { path: '/', element: <Navigate to="/home" replace /> },
              { path: '*', element: <Navigate to="/" replace /> },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ];

  if (user)
    return [
      {
        path: '/',
        element: <Layout user={user} setUser={setUser} />,
        children: [
          {
            path: '',
            element: <Dashboard user={user} setUser={setUser} />,
            children: [
              {
                path: 'home',
                element: <UserHome user={user} />,
              },
              {
                path: 'new-pickup',
                element: <RequestPickup />,
              },
              {
                path: 'order-history',
                element: <UserHistory />,
              },
              { path: '/', element: <Navigate to="/home" replace /> },
              { path: '*', element: <Navigate to="/" replace /> },
            ],
          },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ];

  return [
    {
      path: '/',
      element: <Layout user={user} setUser={setUser} />,
      children: [
        { path: '/', element: <Login setUser={setUser} /> },
        { path: '*', element: <Login setUser={setUser} /> },
      ],
    },
    {
      path: '/mapTest',
      element: <DefaultMap />,
    },
    {
      path: '/liveMap',
      element: <LiveMap />,
    },
    {
      path: '/notifTest',
      element: <NotifTest />,
    },
  ];
};

export default passProps;
