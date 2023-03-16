import Layout from './Layout';
import Login from './Login';
import Dashboard from './Dashboard';

const passProps = (user, setUser) => {
  if (user)
    return [
      {
        path: '/',
        element: <Layout user={user} setUser={setUser} />,
        children: [
          { path: '/dashboard', element: <Dashboard setUser={setUser} /> },
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
  ];
};

export default passProps;
