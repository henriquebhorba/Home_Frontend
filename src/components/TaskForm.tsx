// src/components/TaskForm.tsx
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { User, Task } from '../types';

interface TaskFormProps {
    onTaskCreated: () => void;
    onClose: () => void;
    task?: Task;
}

const Form = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px 0;
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, onClose, task }) => {
    const { user } = useContext(AuthContext);
    const [description, setDescription] = useState(task?.description || '');
    const [deadline, setDeadline] = useState(task?.deadline || '');
    const [priority, setPriority] = useState(task?.priority || 'Low');
    const [assignee, setAssignee] = useState(task?.assignee || '');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await api.get(`/users?adminUuid=${user?.adminUuid}`);
            setUsers(response.data);
        };

        fetchUsers();
    }, [user?.adminUuid]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            const taskData = {
                description,
                deadline,
                priority,
                user: user.username,
                assignee,
            };
            if (task) {
                await api.put(`/tasks/${task._id}`, taskData);
            } else {
                await api.post('/tasks', taskData);
            }
            onTaskCreated();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Description</Label>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label>Deadline</Label>
                <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label>Priority</Label>
                <Select value={priority} onChange={(e) => setPriority(e.target.value)} required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </Select>
            </FormGroup>
            <FormGroup>
                <Label>Assignee</Label>
                <Select value={assignee} onChange={(e) => setAssignee(e.target.value)} required>
                    <option value="">Select Assignee</option>
                    {users.map((user) => (
                        <option key={user._id} value={user.username}>{user.username}</option>
                    ))}
                </Select>
            </FormGroup>
            <Button type="submit">{task ? 'Update Task' : 'Create Task'}</Button>
        </Form>
    );
};

export default TaskForm;
