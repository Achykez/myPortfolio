export interface Project {
  _id?: string;
  title: string;
  description: string;
  appType?: 'web' | 'mobile';
  appUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  githubUrl?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectFormData {
  title: string;
  description: string;
  appType?: 'web' | 'mobile';
  appUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  githubUrl?: string;
  tags?: string[];
}

