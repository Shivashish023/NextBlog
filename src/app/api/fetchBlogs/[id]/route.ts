import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/BlogModel';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await dbConnect();

    try {
        const blog = await Blog.findById(id); 
        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json({ message: 'Error fetching blog post' }, { status: 500 });
    }
}