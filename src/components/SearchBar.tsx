import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 0.5rem;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  width: 200px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: black;
  backdrop-filter: blur(5px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

const Button = styled.button`
  background: rgba(0, 119, 255, 0.6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(0, 95, 204, 0.8);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;

    span {
      display: none;
    }

    svg {
      display: block;
    }
  }

  svg {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

interface Props {
  onSearch: (city: string) => void;
  value:string
}

const SearchBar = ({ onSearch,value }: Props) => {
  const [input, setInput] = useState(value || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={input}
        placeholder="Enter city..."
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit">
        <span>Search</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </Button>
    </Form>
  );
};

export default SearchBar;
