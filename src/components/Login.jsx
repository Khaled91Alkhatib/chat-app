import React from 'react';
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/compat/app";
import { auth } from "../firebase";
import firebase from 'firebase/compat/app';

import "../styles/Login.scss";

const Login = () => {
  return (
    <div className='background'>
      <div className='login'>
        <div>
          <div className='welcome'>Worldnect!</div>
          <div className='message'>Keep in touch with the world!</div>
          <div className='buttons'>
            <button className='google-facebook google' onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
              <GoogleOutlined className='icon' />
              Sign In with Google
            </button>
            <button className='google-facebook' onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
              <FacebookOutlined className='icon' />
              Sign In with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;