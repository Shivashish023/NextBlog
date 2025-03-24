import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  name?: string;
  blogs: Types.ObjectId[]; 
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }], 
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
