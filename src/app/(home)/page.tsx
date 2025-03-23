import React from "react";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                NextBlog: Where Ideas Spark, Stories Flow, and Voices Matter!
            </h1>
            <p className="text-lg text-center text-gray-600 max-w-xl">
                Join us in exploring a world of creativity and expression. Share your thoughts, read inspiring stories, and connect with a community that values every voice.
            </p>
        </div>
    );
}