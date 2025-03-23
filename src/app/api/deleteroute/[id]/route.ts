import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect'; // Ensure you have a utility to connect to your database
import Blog from '@/models/BlogModel'; // Adjust the import based on your model's location

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await dbConnect(); // Connect to the database

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id); // Delete the blog post by ID
        if (!deletedBlog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json({ message: 'Error deleting blog post' }, { status: 500 });
    }
}