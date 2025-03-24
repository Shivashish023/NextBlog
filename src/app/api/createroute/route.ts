import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/BlogModel";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await dbConnect();

    try {
        const { title, content, clerkId } = await req.json();

        if (!clerkId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

     
        const user = await UserModel.findOne({ clerkId });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const newBlog = new Blog({
            title,
            content,
            userId: user._id,
            clerkId, 
        });

        await newBlog.save();

        user.blogs.push(newBlog._id);
        await user.save();

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error("Error creating blog post", error);
        return NextResponse.json({ message: "Error creating blog post", error }, { status: 500 });
    }
}
