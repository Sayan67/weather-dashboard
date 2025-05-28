"use client";

import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../components/Providers/AuthProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  
`;

const Card = styled.div`
  width: 100%;
  padding: 1.5rem;
  max-width: 24rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
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
  color: black;

  &::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  box-sizing: border-box;
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
  font-weight: 600;
  color: #0050d1;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthPageState, registerWithEmailPassword } = useAuth();

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

    if (!name) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await registerWithEmailPassword(
      email,
      password,
      name
    );

    setLoading(false);

    if (error) {
      setError(error.message);
    }
    // Redirect is handled in the context
  };

  return (
    <Container>
      <Card>
        <Title>Create Account</Title>

        {error && <ErrorBox>{error}</ErrorBox>}

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email Address"
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
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <BottomText>
          Already have an account?{" "}
          <TextButton onClick={() => setAuthPageState("login")}>
            Login
          </TextButton>
        </BottomText>
      </Card>
    </Container>
  );
}
