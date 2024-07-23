import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login onSignupLinkClick={() => setIsLogin(false)} />
      ) : (
        <Signup onLoginLinkClick={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthForm;
