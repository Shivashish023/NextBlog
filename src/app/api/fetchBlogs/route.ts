import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/BlogModel';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();

    try {
        const blogs = await Blog.find()
            .populate("userId", "name") 
            .sort({ createdAt: -1 }); 

        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json({ message: "Error fetching blog posts", error }, { status: 500 });
    }
}
