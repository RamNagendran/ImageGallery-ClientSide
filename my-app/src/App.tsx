import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/login';
import ErrorBoudary from './helper/errorBoundary';
import SignUpPage from './components/auth/signup';
import NotFound from './helper/notFound';
import Home from './components/home';
import Dashboard from './components/home/contents/dashboard';
import Images from './components/home/contents/images';

function App() {
  return (
    <div style={{height:"100vh"}} >
      <Routes>
        <Route path="/" element={<LoginPage />} errorElement={<ErrorBoudary />} />
        <Route path='/signup' element={<SignUpPage />} errorElement={<ErrorBoudary />} />
        <Route path='/home' element={<Home />} errorElement={<ErrorBoudary />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='images' element={<Images />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
