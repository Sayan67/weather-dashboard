import React from "react";
import { Link, Router, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useAuth } from "../Providers/AuthProvider";

const HeaderWrapper = styled.div`
  height: 80px;
  padding-left: 2rem;
  padding-right: 2rem;
  position: fixed;
  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff30;
  color: black;
  z-index: 10;
  backdrop-filter: blur(10px);
  a {
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

const ImageButton = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const ProfileWrapper = styled.div`
  position: absolute;
  min-width: 200px;
  top: 80px;
  right: 50px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const LogoutButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  &:hover {
    background-color: #ff6f61;
  }
`;

const ProfileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  cursor: default;
`;

const HistoryButton = styled.button`
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
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
  display: block;
  text-decoration: none;
  color: black;
  box-sizing: border-box;
`;

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOepn, setIsOpen] = React.useState(false);

  return (
    <HeaderWrapper>
      <Link to={"/"}>
        <h1 style={{ fontSize: "1.2rem" }}>Weather App</h1>
      </Link>
      <nav>
        {user?.id ? (
          <ImageButton onClick={() => setIsOpen(!isOepn)}>
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
            {isOepn && <Profile setIsOpen={setIsOpen} />}
          </ImageButton>
        ) : (
          <LoginButton onClick={() => navigate("/auth")}>Login</LoginButton>
        )}
      </nav>
    </HeaderWrapper>
  );
}

function Profile({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <ProfileOverlay onClick={() => setIsOpen(false)}>
      <ProfileWrapper>
        <h2>Profile</h2>
        <p>
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            Email
          </span>{" "}
          : {user?.email}
        </p>
        <HistoryButton onClick={() => navigate("/")}>
          Home
        </HistoryButton>
        <HistoryButton onClick={() => navigate("/history")}>
          See History
        </HistoryButton>
        <LogoutButton
          onClick={async () => {
            await signOut();
            window.location.reload();
          }}
        >
          Logout
        </LogoutButton>
      </ProfileWrapper>
    </ProfileOverlay>
  );
}

export default Header;
