// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Note: We removed the default index.css import here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);