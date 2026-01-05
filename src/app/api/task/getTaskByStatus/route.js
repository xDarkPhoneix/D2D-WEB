import { Task } from "@/app/models/task.model";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/app/lib/db";



export async function POST(req) {
    const token=await getToken({req})
    
    if(!token && token.role!=="admin"){
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
    }

    await connectDB()
    
    const {status}= await req.json()
    
    const task=await Task.find({status:status})

    


    if(!task){
         return NextResponse.json(
      { error: "Failed To Fetch Task" },
      { status: 400 }
    );
    }

     return NextResponse.json({ message: "Task Fetched successfully",task });
  
    
   
    
}