"use client";

import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext, useAuth } from "../Providers/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authPageState, setAuthPageState, signInWithEmailPassword } =
    useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await signInWithEmailPassword(email, password);

    setLoading(false);

    if (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>

        {error && <ErrorBox>{error}</ErrorBox>}

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <BottomText>
          Don't have an account?{" "}
          <TextButton onClick={() => setAuthPageState("signup")}>
            Register
          </TextButton>
        </BottomText>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: white;
`;

const ErrorBox = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: rgba(248, 113, 113, 0.1);
  color: #ef4444;
  border-radius: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(to right, #b3ff94, #89faed);
  color: black;
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BottomText = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: white;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: #b3ff94;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;
