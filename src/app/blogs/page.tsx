"use client";
import { useState, useEffect } from "react";
import React from "react";
import BlogCard from "@/components/blogcard/page";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading"; 

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  userId?: { _id: string; clerkId: string; name: string };
}

const Page: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true); 
        const response = await axios.get("/api/fetchBlogs");
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to fetch blog posts");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/deleteroute/${id}`, {
        data: { clerkId: user?.id },
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog post deleted successfully.");
      router.push("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog post.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <Loading />
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id}>
            <Link href={`/blogs/${blog._id}`}>
              <BlogCard
                author={blog.userId?.name || "Anonymous"}
                id={blog._id}
                title={blog.title}
                content={blog.content}
                date={blog.createdAt}
                onDelete={() => handleDelete(blog._id)}
                canEdit={false} 
              />
            </Link>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Page;
