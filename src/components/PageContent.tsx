"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTheme } from "../contexts/ThemeContext";
import { skills, socialLinks } from "../data";
import { Navigation } from "./Navigation";
import { ComingSoonModal } from "./ComingSoonModal";
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
  SiAppstore,
  SiGoogleplay,
} from "react-icons/si";
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [comingSoonModal, setComingSoonModal] = useState<{
    isOpen: boolean;
    storeType: "appstore" | "playstore";
  }>({ isOpen: false, storeType: "appstore" });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // Reset carousel index when projects change
    if (projects.length === 0) {
      setCurrentProjectIndex(0);
      return;
    }
    
    // Validate current index is within bounds
    if (
      currentProjectIndex >= projects.length ||
      currentProjectIndex < 0 ||
      !projects[currentProjectIndex]
    ) {
      setCurrentProjectIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  // Auto-slide carousel
  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      setCurrentProjectIndex(0);
      const response = await fetch("/api/projects");
      const data = await response.json();
      if (response.ok) {
        const fetchedProjects = data.projects || [];
        setProjects(fetchedProjects);
        // Ensure index is valid after setting projects
        if (fetchedProjects.length > 0) {
          setCurrentProjectIndex(0);
        }
      } else {
        setProjects([]);
        setCurrentProjectIndex(0);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
      setCurrentProjectIndex(0);
    } finally {
      setProjectsLoading(false);
    }
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
          ) : projects.length > 0 && projects[currentProjectIndex] ? (
            <ProjectsCarouselWrapper as={motion.div} variants={fadeInUp}>
              <CarouselContainer
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}>
                <CarouselButton
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentProjectIndex((prev) =>
                      prev === 0 ? projects.length - 1 : prev - 1
                    );
                    setTimeout(() => setIsAutoPlaying(true), 3000);
                  }}
                  aria-label="Previous project"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <FiChevronLeft />
                </CarouselButton>
                <CarouselContent>
                  <AnimatePresence mode="wait">
                    <ProjectCard
                      key={projects[currentProjectIndex]._id}
                      as={motion.div}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}>
                      <ProjectTitle>{projects[currentProjectIndex].title}</ProjectTitle>
                      <ProjectDescription>
                        {projects[currentProjectIndex].description}
                      </ProjectDescription>
                      {projects[currentProjectIndex].tags &&
                        projects[currentProjectIndex].tags.length > 0 && (
                          <ProjectTags>
                            {projects[currentProjectIndex].tags.map((tag, index) => (
                              <TagBadge
                                key={`${projects[currentProjectIndex]._id}-${tag}-${index}`}>
                                {tag}
                              </TagBadge>
                            ))}
                          </ProjectTags>
                        )}
                      {((projects[currentProjectIndex].appType === "web" &&
                        projects[currentProjectIndex].appUrl) ||
                        (projects[currentProjectIndex].appType === "mobile" &&
                          (projects[currentProjectIndex].appStoreUrl ||
                            projects[currentProjectIndex].playStoreUrl)) ||
                        projects[currentProjectIndex].githubUrl) && (
                        <ProjectLinks>
                          {projects[currentProjectIndex].appType === "web" ? (
                            projects[currentProjectIndex].appUrl && (
                              <ProjectLink
                                href={projects[currentProjectIndex].appUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View App">
                                <FiExternalLink />
                                <span>Live App</span>
                              </ProjectLink>
                            )
                          ) : (
                            <>
                              {projects[currentProjectIndex].appStoreUrl ? (
                                <StoreLink
                                  href={projects[currentProjectIndex].appStoreUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Download on App Store"
                                  $storeType="appstore">
                                  <SiAppstore />
                                  <span>App Store</span>
                                </StoreLink>
                              ) : (
                                <StoreButton
                                  onClick={() =>
                                    setComingSoonModal({
                                      isOpen: true,
                                      storeType: "appstore",
                                    })
                                  }
                                  $storeType="appstore"
                                  aria-label="Coming soon on App Store">
                                  <SiAppstore />
                                  <span>App Store</span>
                                </StoreButton>
                              )}
                              {projects[currentProjectIndex].playStoreUrl ? (
                                <StoreLink
                                  href={projects[currentProjectIndex].playStoreUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Download on Play Store"
                                  $storeType="playstore">
                                  <SiGoogleplay />
                                  <span>Play Store</span>
                                </StoreLink>
                              ) : (
                                <StoreButton
                                  onClick={() =>
                                    setComingSoonModal({
                                      isOpen: true,
                                      storeType: "playstore",
                                    })
                                  }
                                  $storeType="playstore"
                                  aria-label="Coming soon on Play Store">
                                  <SiGoogleplay />
                                  <span>Play Store</span>
                                </StoreButton>
                              )}
                            </>
                          )}
                          {projects[currentProjectIndex].githubUrl && (
                            <ProjectLink
                              href={projects[currentProjectIndex].githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View GitHub">
                              <FiGithub />
                              <span>GitHub</span>
                            </ProjectLink>
                          )}
                        </ProjectLinks>
                      )}
                    </ProjectCard>
                  </AnimatePresence>
                </CarouselContent>
                <CarouselButton
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentProjectIndex((prev) =>
                      prev === projects.length - 1 ? 0 : prev + 1
                    );
                    setTimeout(() => setIsAutoPlaying(true), 3000);
                  }}
                  aria-label="Next project"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <FiChevronRight />
                </CarouselButton>
              </CarouselContainer>
              {projects.length > 1 && (
                <CarouselIndicators>
                  {projects.map((_, index) => (
                    <CarouselIndicator
                      key={index}
                      $active={index === currentProjectIndex}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentProjectIndex(index);
                        setTimeout(() => setIsAutoPlaying(true), 3000);
                      }}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </CarouselIndicators>
              )}
            </ProjectsCarouselWrapper>
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

const ProjectsCarouselWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const CarouselContent = styled.div`
  flex: 1;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 350px;
  }
`;

const CarouselButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
`;

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const CarouselIndicator = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "24px" : "8px")};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    width: 24px;
  }
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

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 0.5rem;
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

const StoreLink = styled.a<{ $storeType: "appstore" | "playstore" }>`
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
  background: ${({ theme, $storeType }) =>
    $storeType === "appstore"
      ? `${theme.colors.accent}10`
      : `${theme.colors.accent}10`};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    color: ${({ theme }) => theme.colors.buttonHover};
    background: ${({ theme, $storeType }) =>
      $storeType === "appstore"
        ? `${theme.colors.accent}20`
        : `${theme.colors.accent}20`};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const StoreButton = styled.button<{ $storeType: "appstore" | "playstore" }>`
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
