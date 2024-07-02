// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 102%;
  margin-left: -10px;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <p>&copy; 2024 Mesmo Teto. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;
