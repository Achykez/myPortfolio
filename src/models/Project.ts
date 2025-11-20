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
    appType: {
      type: String,
      enum: ['web', 'mobile'],
      default: 'web',
      trim: true,
    },
    appUrl: {
      type: String,
      trim: true,
      default: '',
    },
    appStoreUrl: {
      type: String,
      trim: true,
      default: '',
    },
    playStoreUrl: {
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

