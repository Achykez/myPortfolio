'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';
import { useTheme } from '../contexts/ThemeContext';
import { Project } from '../types/project';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onComingSoon: (storeType: 'appstore' | 'playstore') => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function ProjectDetailModal({ isOpen, onClose, project, onComingSoon }: ProjectDetailModalProps) {
  const { theme } = useTheme();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
          data-theme={theme}
        >
          <Modal
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            data-theme={theme}
            theme={theme}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <FiX />
            </CloseButton>
            <ModalContent>
              <ModalTitle>{project.title}</ModalTitle>
              <ModalDescription>{project.description}</ModalDescription>
              {project.tags && project.tags.length > 0 && (
                <ModalTags>
                  {project.tags.map((tag, index) => (
                    <TagBadge key={`${project._id}-${tag}-${index}`}>
                      {tag}
                    </TagBadge>
                  ))}
                </ModalTags>
              )}
              {((project.appType === 'web' && project.appUrl) ||
                (project.appType === 'mobile' &&
                  (project.appStoreUrl || project.playStoreUrl)) ||
                project.githubUrl) && (
                <ModalLinks>
                  {project.appType === 'web' ? (
                    project.appUrl && (
                      <ProjectLink
                        href={project.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View App">
                        <FiExternalLink />
                        <span>Live App</span>
                      </ProjectLink>
                    )
                  ) : (
                    <>
                      {project.appStoreUrl ? (
                        <StoreLink
                          href={project.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Download on App Store"
                          $storeType="appstore">
                          <SiAppstore />
                          <span>App Store</span>
                        </StoreLink>
                      ) : (
                        <StoreButton
                          onClick={() => onComingSoon('appstore')}
                          $storeType="appstore"
                          aria-label="Coming soon on App Store">
                          <SiAppstore />
                          <span>App Store</span>
                        </StoreButton>
                      )}
                      {project.playStoreUrl ? (
                        <StoreLink
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Download on Play Store"
                          $storeType="playstore">
                          <SiGoogleplay />
                          <span>Play Store</span>
                        </StoreLink>
                      ) : (
                        <StoreButton
                          onClick={() => onComingSoon('playstore')}
                          $storeType="playstore"
                          aria-label="Coming soon on Play Store">
                          <SiGoogleplay />
                          <span>Play Store</span>
                        </StoreButton>
                      )}
                    </>
                  )}
                  {project.githubUrl && (
                    <ProjectLink
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View GitHub">
                      <FiGithub />
                      <span>GitHub</span>
                    </ProjectLink>
                  )}
                </ModalLinks>
              )}
            </ModalContent>
          </Modal>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    max-height: 90vh;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  border-radius: 50%;
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bgSecondary};
  }
`;

const ModalContent = styled.div`
  padding: 3rem 2rem 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 85vh;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bgSecondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.accent} ${theme.colors.bgSecondary}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2.5rem 1.5rem 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TagBadge = styled.span`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: ${({ theme }) => theme.colors.accent}15;
  border: 1px solid ${({ theme }) => theme.colors.accent}30;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.accent};
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.buttonHover};
  }

  svg {
    font-size: 1rem;
  }
`;

const StoreLink = styled.a<{ $storeType: 'appstore' | 'playstore' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: ${({ theme }) => `${theme.colors.accent}10`};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    color: ${({ theme }) => theme.colors.buttonHover};
    background: ${({ theme }) => `${theme.colors.accent}20`};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const StoreButton = styled.button<{ $storeType: 'appstore' | 'playstore' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.bgSecondary};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.1rem;
  }
`;

