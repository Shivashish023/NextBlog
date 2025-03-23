import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    createdAt: Date;
   
}

const BlogSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
  
});


const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;