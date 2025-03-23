"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card } from '@/components/ui/card'; 
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';

const EditBlog = () => {
    const router = useRouter();
    const params = useParams(); 
    const id = params.id as string; 
   
    const [blog, setBlog] = useState({ title: '', content: '' });
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchBlog = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/fetchBlogs/${id}`);
                    setBlog(response.data);
                } catch (error) {
                    console.error('Error fetching blog:', error);
                    setError('Error fetching blog data');
                }
            }
        };

        fetchBlog();
    }, [id]);

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`/api/editroute/${id}`, blog);
            router.push('/blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
            setError('Error updating blog');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={blog.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <Textarea
                            name="content"
                            value={blog.content}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            placeholder="Write your blog content here"
                            rows={5}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <span className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</span>
                    </div>

                    <Button type="submit" className="w-full">
                        Update Blog
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default EditBlog;