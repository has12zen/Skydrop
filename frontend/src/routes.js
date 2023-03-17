import Layout from './Layout';
import Login from './Login';
import Dashboard from './Dashboard';
import { DefaultMap } from './Components/Map';
import { LiveMap } from './Components/Map/liveMap';
import { NotifTest } from './Notif/test';
import DashHome from './Dashboard/Components/Home';
import Current from './Dashboard/Components/Currents';
import History from './Dashboard/Components/History';

const passProps = (user, setUser) => {
  if (user)
    return [
      {
        path: '/',
        element: <Layout user={user} setUser={setUser} />,
        children: [
          {
            path: '',
            element: <Dashboard setUser={setUser} />,
            children: [
              {
                path: '',
                element: <DashHome />,
              },
              {
                path: 'currents',
                element: <Current />
              },
              {
                path: 'history',
                element: <History />
              },
              {
                path: 'map',
                element: null
              },
            ],
          },
        ],
      },
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
