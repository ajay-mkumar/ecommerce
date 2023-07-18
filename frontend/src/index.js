import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css'
import { Provider } from 'react-redux';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   
  <React.StrictMode>
  <PayPalScriptProvider deferLoading={true}>
    <App />
    </PayPalScriptProvider>
  </React.StrictMode>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
