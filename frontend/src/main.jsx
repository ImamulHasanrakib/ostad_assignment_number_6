import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import FoodProvider from './food-context/FoodProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FoodProvider>
        <App />
      </FoodProvider>
    </BrowserRouter>
  </React.StrictMode>
);
