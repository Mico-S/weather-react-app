import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Added lines to configure the client for AWS Amplify
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);