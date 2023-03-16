import { GoogleLogin } from '@react-oauth/google';

import jwt from 'jwt-decode';

const Login = ({ setUser }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <GoogleLogin
        auto_select
        useOneTap
        onSuccess={(res) => {
          const data = jwt(res.credential);
          setUser(data);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default Login;
