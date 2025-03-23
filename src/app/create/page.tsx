"use client"; 
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Button } from '@/components/ui/button'; 
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const CreateBlog: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
       
        setCurrentDate(new Date().toLocaleDateString('en-US')); 
    }, []);

    const handlePost = async () => {
        try {
            const response = await axios.post('/api/createroute', {
                title,
                content,
            });

            console.log('Post created:', response.data);
           
           
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter blog title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        placeholder="Write your blog content here"
                        rows={5} 
                    />
                </div>

                <div className="mb-4">
                    <span className="text-sm text-gray-500">Date: {currentDate}</span>
                </div>

                <Button onClick={handlePost} className="w-full">
                    Post
                </Button>
            </Card>
        </div>
    );
};

export default CreateBlog;