import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  margin-top: -10px;
  margin-left: -10px;
  width: 102%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  padding-right: 3%;
  & > a {
    color: white;
    margin: 0 10px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <HeaderContainer>
      <h1 style={{marginLeft: '30px'}}>Kanban Board</h1>
      <NavLinks>
        {user && <Link to="/">Home</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user ? (
          <a href="/" onClick={handleLogout}>Logout</a>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
