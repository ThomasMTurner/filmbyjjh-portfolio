console.log("made it before the index imports")
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
console.log("made it after the index imports")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

