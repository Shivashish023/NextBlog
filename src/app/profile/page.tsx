"use client";
import { useState, useEffect } from "react";
import React from "react";
import BlogCard from "@/components/blogcard/page";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  userId?: { _id: string; clerkId: string; name: string };
}

const Profile: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`/api/profile?clerkId=${user.id}`);
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to fetch your blogs");
        console.error("Error fetching user blogs:", err);
      }
    };

    fetchUserBlogs();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/deleteroute/${id}`, {
        data: { clerkId: user?.id }, 
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Blogs</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {blogs.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              author={blog.userId?.name || "You"}
              id={blog._id}
              title={blog.title}
              content={blog.content}
              date={blog.createdAt}
              onDelete={() => handleDelete(blog._id)}
              canEdit={true} 
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">You haven't written any blogs yet.</p>
      )}
    </div>
  );
};

export default Profile;
