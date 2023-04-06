// import logo from './assets/Logo.jpg';
import Login from './components/Login'
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Form from './components/Form';
import './index.css';
import { useSelector } from 'react-redux';
import Error from './components/Error';
import Footer from './components/Footer';


function ProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Form />;
}

function App() {
  return (
    <div className="App w-full">
      <Routes>
        <Route path="/" element={<ProtectedRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      
      </Routes>

      <Footer />

    </div>
  );
}

export default App;