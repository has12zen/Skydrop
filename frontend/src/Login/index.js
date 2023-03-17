import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

import db from '../db';
import { Button, CircularProgress, Typography } from '@mui/material';

import LandingAnimation from './LandingAnimation';
import './index.css';

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
  const [headingIndex, setHeadingIndex] = useState(0);
  const alternateHeadings = [
    'Ship anywhere, anytime',
    'The Ultimate Shipping Solution',
    "Cuz we know you're lazy",
    "Sky's the Limit? Not Anymore!",
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      const headingElement = document.querySelector('.heading');
      if (!headingElement) return;

      headingElement.classList.remove('typing');
      void headingElement.offsetWidth;
      headingElement.classList.add('erasing');
      setTimeout(() => {
        setHeadingIndex(
          (headingIndex) => (headingIndex + 1) % alternateHeadings.length
        );
        headingElement.classList.remove('erasing');
        void headingElement.offsetWidth;
        headingElement.classList.add('typing');
      }, 2000);
    }, 6000);
    return () => clearInterval(interval);
  }, [alternateHeadings.length]);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <>
            <h1 className="logo">SkyDrop</h1>
            <div style={{ marginTop: '30px' }}>
              <CircularProgress />
            </div>
          </>
        ) : (
          <div>
            <div class="landing-banner">
              <LandingAnimation />
            </div>
            <div class="login-section">
              <div width="fit-content">
                <h2 className="heading">{alternateHeadings[headingIndex]}</h2>
              </div>
              <Button
                variant="contained"
                onClick={() => {
                  login();
                }}
                className="button"
              >
                Login with Google
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
