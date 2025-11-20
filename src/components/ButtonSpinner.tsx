import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

interface ButtonSpinnerProps {
  className?: string;
}

export function ButtonSpinner({ className }: ButtonSpinnerProps) {
  return <Spinner className={className} aria-label="Loading" />;
}

