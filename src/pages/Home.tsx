// src/pages/Home.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import TeamMembers from '../components/TeamMembers';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
`;

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" />;
  }

  return (
    <HomeContainer>
      <Title>Welcome, {user.username}!</Title>
      <TeamMembers />
    </HomeContainer>
  );
};

export default Home;
