import React from 'react';
import { motion } from 'framer-motion';
import styles from './Logo.module.css';

interface LogoProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function Logo({ href = '#home', onClick, className = '' }: LogoProps) {
  const logoContent = (
    <svg
      className={styles.logo}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AC Logo"
    >
      {/* A letter - hand-drawn style with high crossbar */}
      <path
        d="M15 75 L25 20 L30 20 L40 75 M22 50 L38 50"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={styles.letterA}
      />
      {/* C letter - open curve, partial arc, open side facing right */}
      <path
        d="M55 20 C45 20, 45 35, 48 50 C45 65, 45 80, 55 80"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={styles.letterC}
      />
    </svg>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={`${styles.logoLink} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {logoContent}
      </motion.a>
    );
  }

  return <div className={`${styles.logoLink} ${className}`}>{logoContent}</div>;
}

