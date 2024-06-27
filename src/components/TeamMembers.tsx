// src/components/TeamMembers.tsx
import React, { useContext, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

const TeamContainer = styled.div`
  padding: 20px;
  width: 600px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const MemberItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const TeamMembers: React.FC = () => {
    const { user, isAdmin } = useContext(AuthContext);
    const [members, setMembers] = useState<User[]>([]);

    const fetchTeamMembers = useCallback(async () => {
        if (user?.adminUuid) {
            const response = await api.get(`/users?adminUuid=${user.adminUuid}`);
            setMembers(response.data);
        }
    }, [user?.adminUuid]);

    const removeMember = async (memberId: string) => {
        await api.put(`/users/${memberId}`, { adminUuid: '' });
        fetchTeamMembers();
    };

    useEffect(() => {
        fetchTeamMembers();
    }, [fetchTeamMembers]);

    if (!user?.adminUuid) {
        return null;
    }

    return (
        <TeamContainer>
            <h2>Team Members</h2>
            {members.map((member) => (
                <MemberItem key={member._id}>
                    <span>{member.username}</span>
                    {isAdmin && (
                        <RemoveButton
                            onClick={() => removeMember(member._id)}
                            disabled={user.username === member.username}
                        >
                            Remove
                        </RemoveButton>
                    )}
                </MemberItem>
            ))}
        </TeamContainer>
    );
};

export default TeamMembers;
