export interface Project {
  _id?: string;
  title: string;
  description: string;
  appUrl?: string;
  githubUrl?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectFormData {
  title: string;
  description: string;
  appUrl?: string;
  githubUrl?: string;
  tags?: string[];
}

