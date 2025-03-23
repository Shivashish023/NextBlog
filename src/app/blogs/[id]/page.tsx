"use client"
import React from 'react';

import Axios from 'axios';

interface Blog {
    title: string;
    content: string;
    createdAt: string; 
}


const BlogPost = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } =await  params; 
    const [blog, setBlog] = React.useState<Blog | null>(null); 
    const [error, setError] = React.useState<string>("");

    React.useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await Axios.get(`/api/fetchBlogs/${id}`); 
                setBlog(response.data);
            } catch  {
                setError('Error fetching blog post');
            }
        };

        if (id) {
            fetchBlog();
        }
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