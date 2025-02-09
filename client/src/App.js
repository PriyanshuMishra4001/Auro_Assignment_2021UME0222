import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PortfolioDetails from './components/PortfolioDetail/PortfolioDetails';
import PortfolioForm from './components/PortfolioForm/PortfolioForm';
import PortfolioList from './components/PortfolioList/PortfolioList';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/create" element={<ProtectedRoute><PortfolioForm /></ProtectedRoute>} />
        <Route path="/portfolios" element={<ProtectedRoute><PortfolioList /></ProtectedRoute>} />
        <Route path="/portfolio/:id" element={<ProtectedRoute><PortfolioDetails /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
