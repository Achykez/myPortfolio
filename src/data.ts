// Skills and Social Links Data for Portfolio (TypeScript)

export interface Skill {
  id: number;
  tech: string;
  icon: string; // Icon name, to be mapped in the UI
}

export const skills: Skill[] = [
  { id: 0, tech: 'Next.js', icon: 'SiNextdotjs' },
  { id: 1, tech: 'React', icon: 'FaReact' },
  { id: 2, tech: 'React Native', icon: 'FaReact' },
  { id: 3, tech: 'Node.js', icon: 'FaNode' },
  { id: 4, tech: 'Electron.js', icon: 'SiElectron' },
  { id: 5, tech: 'TypeScript', icon: 'SiTypescript' },
  { id: 6, tech: 'JavaScript', icon: 'SiJavascript' },
  { id: 7, tech: 'CSS3', icon: 'FaCss3Alt' },
  { id: 8, tech: 'Tailwind CSS', icon: 'SiTailwindcss' },
  { id: 9, tech: 'SQL', icon: 'SiMysql' },
  { id: 10, tech: 'Python', icon: 'SiPython' },
  { id: 11, tech: 'MongoDB', icon: 'SiMongodb' },
  { id: 12, tech: 'Expo', icon: 'SiExpo' },
  { id: 13, tech: 'Postgres', icon: 'SiPostgresql' },
  { id: 14, tech: 'Express', icon: 'SiExpress' },
];

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/achykez',
    icon: 'FaGithub',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/achykez',
    icon: 'FaLinkedin',
  },
];

