import React from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
// import Layout from './components/Layout/Layout';
// import Home from './components/Home/Home';
// import About from './components/About/About';
// import Register from './components/Register/Register';


// const routes = createBrowserRouter([{
//   path:"", element: <Layout />, children: [
//     { path: "home", element: <Home /> },
//     { path: "about", element: <About /> },
//     { path: "*", element: <Register /> }
//   ]
// }]);

export default function App() {
  return (
  
    <BrowserRouter>
    
    <Router />
    </BrowserRouter>
  );
}
