import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import axios from 'axios';
import db from '../db';

import { Button, CircularProgress } from '@mui/material';

import LandingAnimation from './LandingAnimation';
import './index.css';

const setCookie = (name, value, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

const getCookie = (name) => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const Login = ({ setUser }) => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth(db);

  const [isLoading, setIsLoading] = useState(true);

  const loginUser = async (user) => {
    const { displayName, email, photoURL } = user;

    setCookie('accessToken', user.accessToken, 5);

    axios
      .post('/api/auth/login', email)
      .then((res) => {
        console.log(res.data);
        const { name: displayName, email, image: photoURL } = res.data;

        setUser({ displayName, email, photoURL });
      })
      .catch((err) => {
        console.log({ err });

        alert('Failed to login!');
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loginUser(user);
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
            <div className="landing-banner">
              <LandingAnimation />
            </div>
            <div className="login-section">
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
