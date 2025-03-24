"use client";
import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  onDelete: () => void;
  canEdit: boolean; 
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  author,
  date,
  onDelete,
  id,
  canEdit,
}) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:scale-[1.02]",
        "border border-gray-200/50 dark:border-white/10",
        "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg max-w-md"
      )}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span>{author}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {content.length > 100 ? content.substring(0, 100) + "..." : content}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{new Date(date).toDateString()}</span>

          {canEdit && ( 
            <div className="flex space-x-2">
              <Link href={`/edit/${id}`}>
                <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                  <PencilIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </Link>
              <button
                onClick={onDelete}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <TrashIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
