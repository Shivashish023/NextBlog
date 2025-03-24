import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect'; 
import Blog from '@/models/BlogModel'; 

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await dbConnect();

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id); 
        if (!deletedBlog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json({ message: 'Error deleting blog post' }, { status: 500 });
    }
}