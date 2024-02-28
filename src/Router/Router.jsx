import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Register from '../components/Register/Register';
import Login from "../components/Login/Login";

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />
          <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/register"
          element={
            <Register />
            
          }
        />
      </Route>
    </Routes>
  );
}
