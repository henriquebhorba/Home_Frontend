import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import styled from 'styled-components';
import { checkUsernameExists, checkEmailExists } from '../services/api';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background-color: #ffffff;
`;

const Form = styled.form`
  background-color: #f1f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #003964;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #044a80;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUuid, setAdminUuid] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      setError('Username already exists');
      return;
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setError('Email already exists');
      return;
    }

    await register(username, email, password, adminUuid);
    navigate('/login');
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormGroup>
          <Label>Username</Label>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Admin UUID (Optional)</Label>
          <Input type="text" value={adminUuid} onChange={(e) => setAdminUuid(e.target.value)} />
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
};

export default Register;
