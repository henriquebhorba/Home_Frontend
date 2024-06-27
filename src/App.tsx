// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import SetAdminUuid from './pages/SetAdminUuid';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding-top: 60px;
  padding-bottom: 40px;
`;

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Header />
            <MainContainer>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/set-admin-uuid" element={<ProtectedRoute element={<SetAdminUuid />} />} />
                </Routes>
            </MainContainer>
            <Footer />
        </AuthProvider>
    );
};

export default App;
