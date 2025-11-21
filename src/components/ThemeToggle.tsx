'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon, FiHexagon as FiSparkles } from 'react-icons/fi';

const ToggleButton = styled(motion.button)<{ $themeMode?: string }>`
  background: ${({ theme, $themeMode }) => 
    $themeMode === 'glass' 
      ? 'rgba(255, 255, 255, 0.1)' 
      : theme.colors.card};
  border: 1px solid ${({ theme, $themeMode }) => 
    $themeMode === 'glass' 
      ? 'rgba(255, 255, 255, 0.2)' 
      : theme.colors.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  backdrop-filter: ${({ $themeMode }) => 
    $themeMode === 'glass' ? 'blur(10px)' : 'none'};
  box-shadow: ${({ $themeMode }) => 
    $themeMode === 'glass' 
      ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' 
      : 'none'};
  
  &:hover {
    background: ${({ theme, $themeMode }) => 
      $themeMode === 'glass' 
        ? 'rgba(255, 255, 255, 0.15)' 
        : theme.colors.bgSecondary};
    transform: scale(1.05);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  const getNextMode = () => {
    if (themeMode === 'light') return 'dark';
    if (themeMode === 'dark') return 'glass';
    return 'light';
  };

  const getIcon = () => {
    if (themeMode === 'light') return <FiMoon size={20} />;
    if (themeMode === 'dark') return <FiSun size={20} />;
    return <FiSparkles size={20} />;
  };

  return (
    <ToggleButton
      onClick={toggleTheme}
      $themeMode={themeMode}
      aria-label={`Switch to ${getNextMode()} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {getIcon()}
    </ToggleButton>
  );
}

