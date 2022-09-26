import React from 'react';
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "../styles/Login.scss";

const Login = () => {
  return (
    <div className='background'>
      <div className='login'>
        <div>
          <div className='welcome'>Worldnect!</div>
          <div className='message'>Keep in touch with the world!</div>
          <div className='buttons'>
            <button className='google-facebook google'>
              <GoogleOutlined className='icon' />
              Sign In with Google
            </button>
            <button className='google-facebook'>
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