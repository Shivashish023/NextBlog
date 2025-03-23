import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        throw new Error("Failed to connect to MongoDB");
    }
}

export default dbConnect;