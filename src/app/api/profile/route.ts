import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/BlogModel";
import User from "@/models/UserModel";

export async function GET(req: Request) {
  await dbConnect();

 
  const url = new URL(req.url);
  const clerkId = url.searchParams.get("clerkId");

  if (!clerkId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const blogs = await Blog.find({ userId: user._id }).populate("userId", "name");

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
