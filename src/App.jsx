import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />

    </BrowserRouter>
  );
}
