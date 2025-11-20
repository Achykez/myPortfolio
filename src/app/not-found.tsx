'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import styles from './not-found.module.css';

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

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className={styles.main}>
        <motion.div
          className={styles.container}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.errorCode} variants={fadeInUp}>
            404
          </motion.h1>
          <motion.h2 className={styles.title} variants={fadeInUp}>
            Page Not Found
          </motion.h2>
          <motion.p className={styles.description} variants={fadeInUp}>
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
          </motion.p>
          <motion.div className={styles.buttonContainer} variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className={styles.homeButton}>
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}

