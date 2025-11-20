'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '../../contexts/ThemeContext';
import { Navigation } from '../../components/Navigation';
import { TagsInput } from '../../components/TagsInput';
import { ButtonSpinner } from '../../components/ButtonSpinner';
import { Project} from '../../types/project';
import { FiEdit2, FiTrash2, FiExternalLink, FiGithub, FiSmartphone, FiGlobe } from 'react-icons/fi';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Project form schema
const projectFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  appType: z.enum(['web', 'mobile']),
  appUrl: z
    .string()
    .refine((val) => val === '' || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid URL',
    }),
  appStoreUrl: z
    .string()
    .refine((val) => val === '' || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid URL',
    }),
  playStoreUrl: z
    .string()
    .refine((val) => val === '' || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid URL',
    }),
  githubUrl: z
    .string()
    .refine((val) => val === '' || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid URL',
    }),
  tags: z.array(z.string()),
});

type ProjectFormSchemaType = z.infer<typeof projectFormSchema>;

export default function AdminPage() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      appType: 'web',
      appUrl: '',
      appStoreUrl: '',
      playStoreUrl: '',
      githubUrl: '',
      tags: [],
    },
  });

  const appType = watch('appType');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (response.ok) {
        setProjects(data.projects || []);
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to fetch projects' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to fetch projects' });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProjectFormSchemaType) => {
    setStatus({ type: null, message: '' });

    try {
      const url = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: editingProject ? 'Project updated successfully!' : 'Project created successfully!',
        });
        reset();
        setEditingProject(null);
        fetchProjects();
      } else {
        setStatus({ type: 'error', message: responseData.error || 'Failed to save project' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    reset({
      title: project.title,
      description: project.description,
      appType: project.appType || 'web',
      appUrl: project.appUrl || '',
      appStoreUrl: project.appStoreUrl || '',
      playStoreUrl: project.playStoreUrl || '',
      githubUrl: project.githubUrl || '',
      tags: project.tags || [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingProjectId(id);
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Project deleted successfully!' });
        setDeleteConfirm(null);
        fetchProjects();
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to delete project' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to delete project' });
    } finally {
      setDeletingProjectId(null);
    }
  };

  const cancelEdit = () => {
    setEditingProject(null);
    reset({
      title: '',
      description: '',
      appType: 'web',
      appUrl: '',
      appStoreUrl: '',
      playStoreUrl: '',
      githubUrl: '',
      tags: [],
    });
  };

  return (
    <StyledThemeProvider data-theme={theme} theme={theme}>
      <Navigation />
      <Main>
        <Header as={motion.div} initial="hidden" animate="visible" variants={fadeInUp}>
          <h1>Projects Management</h1>
          <p>Create, edit, and manage your portfolio projects</p>
        </Header>

        {/* Form Section */}
        <FormSection as={motion.section} initial="hidden" animate="visible" variants={fadeInUp}>
          <FormTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</FormTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="title">Title *</Label>
              <Input
                type="text"
                id="title"
                {...register('title')}
                placeholder="Project title"
              />
              {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register('description')}
                rows={4}
                placeholder="Project description"
              />
              {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="appType">App Type *</Label>
              <Controller
                name="appType"
                control={control}
                render={({ field }) => (
                  <AppTypeContainer>
                    <AppTypeOption>
                      <input
                        type="radio"
                        id="appType-web"
                        value="web"
                        checked={field.value === 'web'}
                        onChange={() => field.onChange('web')}
                      />
                      <AppTypeLabel htmlFor="appType-web" $checked={field.value === 'web'}>
                        <FiGlobe />
                        <span>Web</span>
                      </AppTypeLabel>
                    </AppTypeOption>
                    <AppTypeOption>
                      <input
                        type="radio"
                        id="appType-mobile"
                        value="mobile"
                        checked={field.value === 'mobile'}
                        onChange={() => field.onChange('mobile')}
                      />
                      <AppTypeLabel htmlFor="appType-mobile" $checked={field.value === 'mobile'}>
                        <FiSmartphone />
                        <span>Mobile</span>
                      </AppTypeLabel>
                    </AppTypeOption>
                  </AppTypeContainer>
                )}
              />
            </FormGroup>
            {appType === 'web' ? (
              <FormGroup>
                <Label htmlFor="appUrl">App URL (optional)</Label>
                <Input
                  type="url"
                  id="appUrl"
                  {...register('appUrl')}
                  placeholder="https://example.com"
                />
                {errors.appUrl && <ErrorMessage>{errors.appUrl.message}</ErrorMessage>}
              </FormGroup>
            ) : (
              <>
                <FormGroup>
                  <Label htmlFor="appStoreUrl">App Store URL (optional)</Label>
                  <Input
                    type="url"
                    id="appStoreUrl"
                    {...register('appStoreUrl')}
                    placeholder="https://apps.apple.com/app/..."
                  />
                  {errors.appStoreUrl && <ErrorMessage>{errors.appStoreUrl.message}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="playStoreUrl">Play Store URL (optional)</Label>
                  <Input
                    type="url"
                    id="playStoreUrl"
                    {...register('playStoreUrl')}
                    placeholder="https://play.google.com/store/apps/details?id=..."
                  />
                  {errors.playStoreUrl && <ErrorMessage>{errors.playStoreUrl.message}</ErrorMessage>}
                </FormGroup>
              </>
            )}
            <FormGroup>
              <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
              <Input
                type="url"
                id="githubUrl"
                {...register('githubUrl')}
                placeholder="https://github.com/username/repo"
              />
              {errors.githubUrl && <ErrorMessage>{errors.githubUrl.message}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="tags">Tech Stack Tags (optional)</Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Add tags (press Enter or comma)"
                  />
                )}
              />
            </FormGroup>
            <ButtonGroup>
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting && <ButtonSpinner />}
                {isSubmitting 
                  ? (editingProject ? 'Updating...' : 'Creating...') 
                  : (editingProject ? 'Update Project' : 'Create Project')
                }
              </SubmitButton>
              {editingProject && (
                <CancelButton
                  type="button"
                  onClick={cancelEdit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </CancelButton>
              )}
            </ButtonGroup>
            {status.type && (
              <StatusMessage $type={status.type}>{status.message}</StatusMessage>
            )}
          </Form>
        </FormSection>

        {/* Projects Table Section */}
        <TableSection as={motion.section} initial="hidden" animate="visible" variants={fadeInUp}>
          <TableTitle>All Projects ({projects.length})</TableTitle>
          {loading ? (
            <LoadingMessage>Loading projects...</LoadingMessage>
          ) : projects.length === 0 ? (
            <EmptyState>
              <p>No projects yet. Create your first project above!</p>
            </EmptyState>
          ) : (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Links</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td>
                        <ProjectTitle>{project.title}</ProjectTitle>
                      </td>
                      <td>
                        <ProjectDescription>{project.description}</ProjectDescription>
                      </td>
                      <td>
                        <LinksContainer>
                          {project.appType === 'mobile' ? (
                            <>
                              {project.appStoreUrl && (
                                <LinkButton
                                  href={project.appStoreUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="App Store"
                                >
                                  <SiAppstore />
                                </LinkButton>
                              )}
                              {project.playStoreUrl && (
                                <LinkButton
                                  href={project.playStoreUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Play Store"
                                >
                                  <SiGoogleplay />
                                </LinkButton>
                              )}
                            </>
                          ) : (
                            project.appUrl && (
                              <LinkButton
                                href={project.appUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View App"
                              >
                                <FiExternalLink />
                              </LinkButton>
                            )
                          )}
                          {project.githubUrl && (
                            <LinkButton
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View GitHub"
                            >
                              <FiGithub />
                            </LinkButton>
                          )}
                          {project.appType === 'mobile' &&
                            !project.appStoreUrl &&
                            !project.playStoreUrl &&
                            !project.githubUrl && <NoLinks>No links</NoLinks>}
                          {project.appType !== 'mobile' &&
                            !project.appUrl &&
                            !project.githubUrl && <NoLinks>No links</NoLinks>}
                        </LinksContainer>
                      </td>
                      <td>
                        <ActionsContainer>
                          <EditButton
                            onClick={() => handleEdit(project)}
                            title="Edit"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiEdit2 />
                          </EditButton>
                          {deleteConfirm === project._id ? (
                            <ConfirmDeleteContainer>
                              <ConfirmText>Delete?</ConfirmText>
                              <ConfirmButton
                                onClick={() => project._id && handleDelete(project._id)}
                                $danger
                                disabled={deletingProjectId === project._id}
                              >
                                {deletingProjectId === project._id && <ButtonSpinner />}
                                {deletingProjectId === project._id ? 'Deleting...' : 'Yes'}
                              </ConfirmButton>
                              <CancelButton
                                onClick={() => setDeleteConfirm(null)}
                                disabled={deletingProjectId === project._id}
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                              >
                                No
                              </CancelButton>
                            </ConfirmDeleteContainer>
                          ) : (
                            <DeleteButton
                              onClick={() => setDeleteConfirm(project._id || null)}
                              title="Delete"
                              disabled={deletingProjectId === project._id}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FiTrash2 />
                            </DeleteButton>
                          )}
                        </ActionsContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </TableSection>
      </Main>
    </StyledThemeProvider>
  );
}

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
  min-height: 100vh;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5rem 1rem 3rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FormSection = styled.section`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorMessage = styled.span`
  font-size: 0.85rem;
  color: #ff4444;
  margin-top: 0.25rem;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.accent}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Textarea = styled.textarea`
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.accent}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.button};
  color: #ffffff;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-family: inherit;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.buttonHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSecondary};
  }
`;

const StatusMessage = styled.div<{ $type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
  background: ${({ theme, $type }) =>
    $type === 'success'
      ? `${theme.colors.accent}20`
      : 'rgba(255, 0, 0, 0.1)'};
  color: ${({ theme, $type }) =>
    $type === 'success' ? theme.colors.accent : '#ff4444'};
  border: 1px solid
    ${({ theme, $type }) =>
      $type === 'success' ? theme.colors.accent : '#ff4444'};
`;

const TableSection = styled.section`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  overflow-x: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const TableTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  thead {
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  }

  th {
    text-align: left;
    padding: 1rem;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: ${({ theme }) => theme.colors.text};
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    th,
    td {
      padding: 0.75rem 0.5rem;
    }
  }
`;

const ProjectTitle = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const ProjectDescription = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const LinkButton = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.25rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

const NoLinks = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const EditButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.buttonHover};
  }
`;

const DeleteButton = styled(motion.button)`
  background: none;
  border: none;
  color: #ff4444;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover:not(:disabled) {
    color: #cc0000;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmDeleteContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ConfirmText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: 0.25rem;
`;

const ConfirmButton = styled.button<{ $danger?: boolean }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  background: ${({ $danger }) => ($danger ? '#ff4444' : 'transparent')};
  color: ${({ $danger }) => ($danger ? '#ffffff' : 'inherit')};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  &:hover:not(:disabled) {
    background: ${({ $danger }) => ($danger ? '#cc0000' : 'transparent')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AppTypeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const AppTypeOption = styled.div`
  flex: 1;
  
  input[type="radio"] {
    display: none;
  }
`;

const AppTypeLabel = styled.label<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme, $checked }) => ($checked ? theme.colors.accent : theme.colors.border)};
  background: ${({ theme, $checked }) => ($checked ? `${theme.colors.accent}15` : theme.colors.bg)};
  color: ${({ theme, $checked }) => ($checked ? theme.colors.accent : theme.colors.textSecondary)};
  font-size: 0.95rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 1.25rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme, $checked }) => ($checked ? `${theme.colors.accent}15` : theme.colors.bgSecondary)};
  }
`;

