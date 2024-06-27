// src/pages/SetAdminUuid.tsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Form = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SetAdminUuid: React.FC = () => {
    const { user, setUser } = useContext(AuthContext);
    const [uuid, setUuid] = useState('');
    const navigate = useNavigate();

    const handleSetUuid = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await api.put(`/users/${user?._id}`, { adminUuid: uuid });
        if (response.data) {
            setUser({ ...user!, adminUuid: uuid });
            navigate('/dashboard');
        }
    };

    const handleCreateAdmin = async () => {
        const newUuid = uuidv4();
        const response = await api.put(`/users/${user?._id}`, { adminUuid: newUuid });
        if (response.data) {
            setUser({ ...user!, adminUuid: newUuid });
            navigate('/dashboard');
        }
    };

    return (
        <Form onSubmit={handleSetUuid}>
            <FormGroup>
                <Label>Enter Admin UUID</Label>
                <Input type="text" value={uuid} onChange={(e) => setUuid(e.target.value)} required />
            </FormGroup>
            <Button type="submit">Set Admin UUID</Button>
            <Button type="button" onClick={handleCreateAdmin}>Create New Admin UUID</Button>
        </Form>
    );
};

export default SetAdminUuid;
