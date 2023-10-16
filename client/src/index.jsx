import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserRoleProvider } from './userRoleContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserRoleProvider>
      <App />
    </UserRoleProvider>
  </React.StrictMode>
);

