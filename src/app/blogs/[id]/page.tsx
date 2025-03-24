"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Axios from "axios";

interface Blog {
    title: string;
    content: string;
    createdAt: string;
    userId?: { name: string }; 
}

const BlogPost = () => {
    const params = useParams();
    const id = params.id as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await Axios.get(`/api/fetchBlogs/${id}`);
                setBlog(response.data);
            } catch {
                setError("Error fetching blog post");
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (error) return <div className="text-red-500">{error}</div>;
    if (!blog) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
       
    
        
        <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {blog.title}
            </h1>
            <div className="flex items-center gap-3 text-gray-600 text-sm mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                        {blog.userId?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="font-medium text-gray-800">
                        {blog.userId?.name || "Unknown Author"}
                    </span>
                </div>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
                {blog.content}
            </div>
        </div>
    </div>
    );
};

export default BlogPost;
