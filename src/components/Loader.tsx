import React from 'react';
import styles from './Loader.module.css';
import { LogoIcon } from '../assets/icons/logo';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Loader({ size = 'medium', className = '' }: LoaderProps) {
  const sizeMap = {
    small: 100,
    medium: 150,
    large: 200,
  };

  return (
    <div className={`${styles.loaderContainer} ${className}`} role="status" aria-label="Loading">
      <div className={`${styles.logoWrapper} ${styles[size]}`}>
        <LogoIcon
          width={sizeMap[size]}
          height={sizeMap[size]}
          className={styles.logo}
          aria-label="Loading"
        />
      </div>
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}

