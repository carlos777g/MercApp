import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { FavProvider } from './context/FavContext';
import { CarritoProvider } from './context/CartContext';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <CarritoProvider>
      <FavProvider>
        <BrowserRouter>
          <App />
          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </FavProvider>
    </CarritoProvider>
  </React.StrictMode>

);





