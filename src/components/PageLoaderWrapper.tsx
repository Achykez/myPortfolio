'use client';

import { PageLoader } from './PageLoader';

interface PageLoaderWrapperProps {
  children: React.ReactNode;
}

export function PageLoaderWrapper({ children }: PageLoaderWrapperProps) {
  return <PageLoader>{children}</PageLoader>;
}

