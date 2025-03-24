import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  createdAt: Date;
  userId: Types.ObjectId;
  clerkId: string;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clerkId: { type: String, required: true }, 
  },
  { timestamps: true }
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
