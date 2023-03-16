import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

import db from '../db';
import { Button, CircularProgress } from '@mui/material';

const Login = ({ setUser }) => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth(db);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;

        setUser({ displayName, email, photoURL });
      } else setIsLoading(false);
    });
  }, []);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        console.log({ user });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            login();
          }}
        >
          Login with Google
        </Button>
      )}
    </div>
  );
};

export default Login;
