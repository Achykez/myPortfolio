"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Marquee from "react-fast-marquee";
import { useTheme } from "../contexts/ThemeContext";
import { skills, socialLinks } from "../data";
import { Navigation } from "./Navigation";
import { ComingSoonModal } from "./ComingSoonModal";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ButtonSpinner } from "./ButtonSpinner";
import { Loader } from "./Loader";
import { Project } from "../types/project";
import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNode,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiMysql,
  SiPython,
  SiElectron,
  SiMongodb,
  SiExpo,
  SiPostgresql,
  SiTailwindcss,
  SiExpress,
} from "react-icons/si";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub />,
  FaLinkedin: <FaLinkedin />,
  FaReact: <FaReact />,
  FaNode: <FaNode />,
  FaCss3Alt: <FaCss3Alt />,
  SiNextdotjs: <SiNextdotjs />,
  SiTypescript: <SiTypescript />,
  SiJavascript: <SiJavascript />,
  SiMysql: <SiMysql />,
  SiPython: <SiPython />,
  SiElectron: <SiElectron />,
  SiMongodb: <SiMongodb />,
  SiExpo: <SiExpo />,
  SiPostgresql: <SiPostgresql />,
  SiTailwindcss: <SiTailwindcss />,
  SiExpress: <SiExpress />,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Message is required"),
  honey: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Typing animation component
const TypingText = ({
  text,
  speed = 20,
  onComplete,
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setShowCursor(true);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
        if (onComplete) onComplete();
        // Hide cursor after a delay
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, onComplete]);

  // Cursor blinking animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <span
          style={{
            opacity: showCursor ? 1 : 0.3,
            color: "inherit",
            marginLeft: "2px",
            transition: "opacity 0.3s ease",
          }}>
          |
        </span>
      )}
    </span>
  );
};

export function PageContent() {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honey: "",
    },
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [gradientWidth, setGradientWidth] = useState(100);
  const [comingSoonModal, setComingSoonModal] = useState<{
    isOpen: boolean;
    storeType: "appstore" | "playstore";
  }>({ isOpen: false, storeType: "appstore" });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const updateGradientWidth = () => {
      if (window.innerWidth >= 1024) {
        setGradientWidth(150);
      } else if (window.innerWidth >= 768) {
        setGradientWidth(100);
      } else {
        setGradientWidth(50);
      }
    };

    updateGradientWidth();
    window.addEventListener('resize', updateGradientWidth);
    return () => window.removeEventListener('resize', updateGradientWidth);
  }, []);


  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      const response = await fetch("/api/projects");
      const data = await response.json();
      if (response.ok) {
        const fetchedProjects = data.projects || [];
        setProjects(fetchedProjects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const onSubmit = async (data: ContactFormData) => {
    if (data.honey) return; // Spam bot detected

    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        reset();
      } else {
        setStatus({
          type: "error",
          message:
            responseData.error || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <StyledThemeProvider data-theme={theme} theme={theme}>
      <Navigation />
      <Main>
        {/* Hero Section */}
        <HeroSection
          id="home"
          as={motion.section}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}>
          <motion.h1 variants={fadeInUp}>Achike Chude</motion.h1>
          <motion.h2 variants={fadeInUp}>
            Frontend-Heavy Fullstack Mobile Developer
          </motion.h2>
          <motion.p variants={fadeInUp}>
            <TypingText
              text="Building modern web & cross-platform experiences with Next.js, React Native, Node.js, Electron, and TypeScript."
              speed={50}
            />
          </motion.p>
          <SocialLinks as={motion.div} variants={fadeInUp}>
            {socialLinks.map((link) => (
              <SocialLink
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}>
                {iconMap[link.icon]}
              </SocialLink>
            ))}
          </SocialLinks>
        </HeroSection>

        {/* Skills Section */}
        <Section
          id="skills"
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}>
          <SectionTitle as={motion.h2} variants={fadeInUp}>
            My Stack
          </SectionTitle>
          <SkillsGrid as={motion.div} variants={staggerContainer}>
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                as={motion.div}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}>
                <SkillIcon>{iconMap[skill.icon]}</SkillIcon>
                <span>{skill.tech}</span>
              </SkillCard>
            ))}
          </SkillsGrid>
        </Section>

        {/* Projects Section */}
        <Section
          id="projects"
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}>
          <SectionTitle as={motion.h2} variants={fadeInUp}>
            My Projects
          </SectionTitle>
          {projectsLoading ? (
            <LoaderWrapper as={motion.div} variants={fadeInUp}>
              <Loader size="small" />
            </LoaderWrapper>
          ) : projects.length === 0 ? (
            <EmptyState as={motion.div} variants={fadeInUp}>
              <EmptyStateIcon>📁</EmptyStateIcon>
              <EmptyStateText>No projects to display yet.</EmptyStateText>
            </EmptyState>
          ) : projects.length > 0 ? (
            <ProjectsMarqueeWrapper as={motion.div} variants={fadeInUp}>
              <Marquee
                speed={50}
                pauseOnHover={true}
                gradient={true}
                gradientColor={theme.colors.bg}
                gradientWidth={gradientWidth}
                style={{ padding: "1rem 0" }}>
                {[...projects, ...projects].map((project, index) => (
                  <CardWrapper key={`${project._id}-${index}`}>
                    <ProjectCard
                      as={motion.div}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProjectClick(project)}>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>
                      {project.description}
                    </ProjectDescription>
                    {project.tags && project.tags.length > 0 && (
                      <ProjectTags>
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <TagBadge
                            key={`${project._id}-${tag}-${tagIndex}`}>
                            {tag}
                          </TagBadge>
                        ))}
                        {project.tags.length > 3 && (
                          <TagBadge>+{project.tags.length - 3}</TagBadge>
                        )}
                      </ProjectTags>
                      )}
                    </ProjectCard>
                  </CardWrapper>
                ))}
              </Marquee>
            </ProjectsMarqueeWrapper>
          ) : (
            <EmptyState as={motion.div} variants={fadeInUp}>
              <EmptyStateIcon>📁</EmptyStateIcon>
              <EmptyStateText>No projects to display yet.</EmptyStateText>
            </EmptyState>
          )}
        </Section>

        {/* About Section */}
        <Section
          id="about"
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}>
          <SectionTitle as={motion.h2} variants={fadeInUp}>
            About Me
          </SectionTitle>
          <AboutText as={motion.p} variants={fadeInUp}>
            I have a broad range of skills that enable me to tackle various web
            and app development projects. As a FrontEnd Heavy FullStack
            developer, I can handle all aspects of the development process, from
            ideation and design to implementation and deployment. I have a deep
            understanding of front-end technologies, including HTML, CSS, and
            JavaScript, as well as popular front-end frameworks such as React
            and Next JS. Additionally, I have experience with back-end
            technologies like Node.js, Express, and PostgreSQL, MongoDB, React
            Native, Electron JS, TypeScript, allowing me to develop full-stack
            applications. I am familiar with various development tools and
            practices, including Git, Agile methodologies, and test-driven
            development. Overall, I am a versatile developer with a diverse set
            of skills and a passion for creating user-friendly and engaging web
            and app experiences. I am also a fast learner and I am always
            looking to improve my skills and stay up to date with the latest
            technologies.
          </AboutText>
        </Section>

        {/* Contact Section */}
        <Section
          id="contact"
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}>
          <SectionTitle as={motion.h2} variants={fadeInUp}>
            Get In Touch
          </SectionTitle>
          <ContactForm
            as={motion.form}
            variants={fadeInUp}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off">
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Your name"
              />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                {...register("message")}
                rows={6}
                placeholder="Your message..."
              />
              {errors.message && (
                <ErrorMessage>{errors.message.message}</ErrorMessage>
              )}
            </FormGroup>
            {/* Honeypot field for spam protection */}
            <input
              type="text"
              {...register("honey")}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              {isSubmitting && <ButtonSpinner />}
              {isSubmitting ? "Sending..." : "Send Message"}
            </SubmitButton>
            {status.type && (
              <StatusMessage $type={status.type}>
                {status.message}
              </StatusMessage>
            )}
          </ContactForm>
        </Section>
      </Main>
      <ComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() =>
          setComingSoonModal({ isOpen: false, storeType: "appstore" })
        }
        storeType={comingSoonModal.storeType}
      />
      <ProjectDetailModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onComingSoon={(storeType) => {
          setIsProjectModalOpen(false);
          setComingSoonModal({ isOpen: true, storeType });
        }}
      />
    </StyledThemeProvider>
  );
}

const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
  min-height: 100vh;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5rem 1rem 3rem;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 8rem;
  padding-top: 2rem;

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent},
      ${({ theme }) => theme.colors.text}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h2 {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1.5rem;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Section = styled.section`
  margin-bottom: 6rem;
  scroll-margin-top: 5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 3rem;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 2rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
  }
`;

const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;

  span {
    font-size: 0.9rem;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutText = styled.p`
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
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
  background: ${({ theme }) => theme.colors.card};
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
  background: ${({ theme }) => theme.colors.card};
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
  margin-top: 0.5rem;
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

const StatusMessage = styled.div<{ $type: "success" | "error" }>`
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
  background: ${({ theme, $type }) =>
    $type === "success" ? `${theme.colors.accent}20` : "rgba(255, 0, 0, 0.1)"};
  color: ${({ theme, $type }) =>
    $type === "success" ? theme.colors.accent : "#ff4444"};
  border: 1px solid
    ${({ theme, $type }) =>
      $type === "success" ? theme.colors.accent : "#ff4444"};
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProjectsMarqueeWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 100%;
    padding: 0 2rem;
  }
`;

const CardWrapper = styled.div`
  margin-right: 1.5rem;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 320px;
  min-width: 320px;
  height: 420px;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 280px;
    min-width: 280px;
    height: 380px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
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
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent}25;
    border-color: ${({ theme }) => theme.colors.accent}50;
    transform: translateY(-1px);
  }
`;

