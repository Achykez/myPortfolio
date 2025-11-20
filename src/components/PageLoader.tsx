'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from './Loader';
import styles from './PageLoader.module.css';

interface PageLoaderProps {
  children: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple timeout to show loader briefly, then reveal content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Show loader for 1 second

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            className={styles.loaderWrapper}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loader size="large" />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={styles.contentWrapper}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

