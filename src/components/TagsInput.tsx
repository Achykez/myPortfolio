'use client';

import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagsInput({ value, onChange, placeholder = 'Add tags (press Enter or comma)' }: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  };

  return (
    <TagsInputContainer>
      <TagsContainer>
        {value.map((tag) => (
          <Tag key={tag}>
            <TagText>{tag}</TagText>
            <RemoveButton
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              <FiX />
            </RemoveButton>
          </Tag>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? placeholder : ''}
        />
      </TagsContainer>
      <HelperText>Press Enter or comma to add a tag</HelperText>
    </TagsInputContainer>
  );
}

const TagsInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  min-height: 3rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.accent}20`};
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: ${({ theme }) => theme.colors.accent}20;
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  border-radius: 6px;
  font-size: 0.875rem;
`;

const TagText = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.buttonHover};
  }

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 120px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: inherit;
  padding: 0.25rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const HelperText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

