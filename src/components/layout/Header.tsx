import React from "react";
import { Link, Router, useNavigate } from "react-router-dom";

import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 80px;
  padding-left: 1rem;
  padding-right: 10rem;
  position: fixed;
  width: 95dvw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff30;
  color: black;
  z-index: 10;
  backdrop-filter: blur(10px);
  nav {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  a{
    text-decoration: none;
    color: black;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(to right, #b3ff94, #89faed);
  color: black;
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {};
  return (
    <HeaderWrapper>
      <Link to={'/'}>
        <h1 style={{ fontSize: "1.2rem" }}>Weather App</h1>
      </Link>
      <nav>
        <LoginButton onClick={() => navigate("/auth")}>Login</LoginButton>
      </nav>
    </HeaderWrapper>
  );
}

export default Header;
