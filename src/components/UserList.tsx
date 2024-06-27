import React from 'react';
import styled from 'styled-components';
import { User } from '../types';
import api from '../services/api';

const UserListContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const UserList: React.FC<{ users: User[], onRemove: (userId: string) => void }> = ({ users, onRemove }) => {
    const handleRemove = async (userId: string) => {
        await api.delete(`/users/${userId}`);
        onRemove(userId);
    };

    return (
        <UserListContainer>
            {users.map(user => (
                <UserItem key={user._id}>
                    <span>{user.username}</span>
                    <RemoveButton onClick={() => handleRemove(user._id)}>Remove</RemoveButton>
                </UserItem>
            ))}
        </UserListContainer>
    );
};

export default UserList;
