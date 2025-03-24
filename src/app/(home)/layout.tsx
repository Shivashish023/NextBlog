import Navbar from "@/components/Navbar/page";
import dbConnect from "@/utils/dbConnect";
import UserModel from "@/models/UserModel";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await dbConnect();

  const user = await currentUser();
  if (!user) return null; 

  try {
    
    let loggedInUser = await UserModel.findOne({ clerkId: user.id });

  
    if (!loggedInUser) {
      loggedInUser = new UserModel({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName || "Unknown",
        blogs:[]
      });

      await loggedInUser.save();
    }
  } catch (error) {
    console.error("Error handling user login:", error);
    return null; 
  }

  return (
    <div>
      
      {children}
    </div>
  );
};

export default Layout;
