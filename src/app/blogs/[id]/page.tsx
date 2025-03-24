"use client";

import React, { useEffect, useState } from "react";
import Axios from "axios";

interface Blog {
  title: string;
  content: string;
  createdAt: string;
}

const BlogPost = ({ params }: { params: { id: string } }) => {
  const { id } = params; // ✅ params is an object, not a Promise
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await Axios.get(`/api/fetchBlogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err); // ✅ Log error for debugging
        setError("Error fetching blog post");
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-post">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="content">{blog.content}</div>
    </div>
  );
};

export default BlogPost;
