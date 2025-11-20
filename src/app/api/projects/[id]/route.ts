import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import ProjectModel from '../../../../models/Project';
import { ProjectFormData } from '../../../../types/project';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await connectDB();
    const project = await ProjectModel.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const formattedProject = {
      ...project,
      _id: project._id?.toString(),
      createdAt: project.createdAt?.toString(),
      updatedAt: project.updatedAt?.toString(),
    };

    return NextResponse.json({ project: formattedProject }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await connectDB();
    const body: ProjectFormData = await request.json();
    const { title, description, appUrl, githubUrl, tags } = body;

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Validate URLs if provided
    if (appUrl && !isValidUrl(appUrl)) {
      return NextResponse.json(
        { error: 'Invalid app URL format' },
        { status: 400 }
      );
    }

    if (githubUrl && !isValidUrl(githubUrl)) {
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

    const project = await ProjectModel.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        appUrl: appUrl?.trim() || '',
        githubUrl: githubUrl?.trim() || '',
        ...(tags !== undefined && { tags: processedTags }),
      },
      { new: true, runValidators: true }
    ).lean();

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const formattedProject = {
      ...project,
      _id: project._id?.toString(),
      createdAt: project.createdAt?.toString(),
      updatedAt: project.updatedAt?.toString(),
    };

    return NextResponse.json(
      { project: formattedProject, message: 'Project updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await connectDB();
    const project = await ProjectModel.findByIdAndDelete(id).lean();

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
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

