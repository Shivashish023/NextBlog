import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/BlogModel';
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await dbConnect();

    const updatedData = await request.json();

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedBlog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json({ message: 'Error updating blog post' }, { status: 500 });
    }
}