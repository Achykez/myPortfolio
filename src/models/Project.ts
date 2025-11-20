import mongoose, { Schema, Model } from 'mongoose';
import { Project } from '../types/project';

const ProjectSchema = new Schema<Project>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    appUrl: {
      type: String,
      trim: true,
      default: '',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel: Model<Project> =
  mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema);

export default ProjectModel;

