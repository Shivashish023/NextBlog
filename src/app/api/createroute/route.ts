import dbConnect from '@/utils/dbConnect';
import Blog from '@/models/BlogModel';

import { NextResponse } from 'next/server'; 

export async function POST(req: Request) {
    await dbConnect(); 

    try {
        const { title, content } = await req.json(); 
       
        const newBlog = new Blog({ title, content });
        await newBlog.save(); 
        
        return NextResponse.json(newBlog, { status: 201 }); 
    } catch (error) {
        console.error("Error creating blog post", error);
        return NextResponse.json({ message: 'Error creating blog post', error }, { status: 500 }); 
    }
}