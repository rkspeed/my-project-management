import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/css/main.bundle.css";
import './Database/Firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
