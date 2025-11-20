import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import ProjectModel from '../../../models/Project';
import { ProjectFormData } from '../../../types/project';

export const dynamic = 'force-dynamic';

// GET all projects
export async function GET() {
  try {
    await connectDB();
    const projects = await ProjectModel.find({}).sort({ createdAt: -1 }).lean();
    
    // Convert _id to string and handle dates
    const formattedProjects = projects.map((project) => ({
      ...project,
      _id: project._id?.toString(),
      createdAt: project.createdAt?.toString(),
      updatedAt: project.updatedAt?.toString(),
    }));

    return NextResponse.json({ projects: formattedProjects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: ProjectFormData = await request.json();
    const { title, description, appType, appUrl, appStoreUrl, playStoreUrl, githubUrl, tags } = body;

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Validate appType
    const validAppType = appType === 'mobile' ? 'mobile' : 'web';

    // Validate URLs based on app type
    if (validAppType === 'web') {
      if (appUrl && appUrl.trim() && !isValidUrl(appUrl)) {
        return NextResponse.json(
          { error: 'Invalid app URL format' },
          { status: 400 }
        );
      }
    } else {
      if (appStoreUrl && appStoreUrl.trim() && !isValidUrl(appStoreUrl)) {
        return NextResponse.json(
          { error: 'Invalid App Store URL format' },
          { status: 400 }
        );
      }
      if (playStoreUrl && playStoreUrl.trim() && !isValidUrl(playStoreUrl)) {
        return NextResponse.json(
          { error: 'Invalid Play Store URL format' },
          { status: 400 }
        );
      }
    }

    if (githubUrl && githubUrl.trim() && !isValidUrl(githubUrl)) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL format' },
        { status: 400 }
      );
    }

    // Validate and process tags
    let processedTags: string[] = [];
    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        return NextResponse.json(
          { error: 'Tags must be an array' },
          { status: 400 }
        );
      }
      // Trim and filter out empty tags
      processedTags = tags
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    const project = new ProjectModel({
      title: title.trim(),
      description: description.trim(),
      appType: validAppType,
      appUrl: validAppType === 'web' ? (appUrl?.trim() || '') : '',
      appStoreUrl: validAppType === 'mobile' ? (appStoreUrl?.trim() || '') : '',
      playStoreUrl: validAppType === 'mobile' ? (playStoreUrl?.trim() || '') : '',
      githubUrl: githubUrl?.trim() || '',
      tags: processedTags,
    });

    await project.save();

    const formattedProject = {
      ...project.toObject(),
      _id: project._id.toString(),
      createdAt: project.createdAt?.toString(),
      updatedAt: project.updatedAt?.toString(),
    };

    return NextResponse.json(
      { project: formattedProject, message: 'Project created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    
    // Handle Mongoose validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const mongooseError = error as { errors?: Record<string, { message: string }> };
      const validationErrors = Object.values(mongooseError.errors || {}).map(
        (err) => err.message
      );
      return NextResponse.json(
        { error: `Validation error: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

