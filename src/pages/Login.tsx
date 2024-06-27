import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import { setAuthToken } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import * as jwt from 'jwt-decode';
import { User } from '../types';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Form = styled.form`
  background-color: #f1f0f0;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #003964;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #002d4f;
  }
`;

const RedirectText = styled.p`
  margin-top: 20px;
  color: #003964;
  font-size: 14px;
`;

const Login: React.FC = () => {
  const { setUser, setIsAdmin } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await login(username, password);
    setAuthToken(token);
    const decodedUser = jwt.jwtDecode<User>(token);
    setUser(decodedUser);
    setIsAdmin(decodedUser.role === 'admin');
    navigate('/dashboard');
  };

  return (
    <FormContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
      <RedirectText>
        Don't have an account? <Link to="/register" style={{ color: '#003964' }}>Register here</Link>
      </RedirectText>
    </FormContainer>
  );
};

export default Login;
