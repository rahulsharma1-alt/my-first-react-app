import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import LoginCard from './component/login/login'
import CreateAccount from './component/create_account/CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccountPageTwo from './component/create_account/CreateAccountPageTwo';
import DashboardPage from './component/dashboard/Dashboard';


function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginCard />
          }
        />
        <Route
          path="/create-account"
          element={
            <CreateAccount />
          }
        />
        <Route
          path="/create-account-page-two"
          element={
            <CreateAccountPageTwo />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage />
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
