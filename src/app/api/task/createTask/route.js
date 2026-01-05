import { Task } from "@/app/models/task.model";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/app/lib/db";



export async function POST(req) {
    const token=await getToken({req})
    
    if(!token && token.role!=="user"){
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
    }


    const {task}=await req.json()

    if(!task){
      return NextResponse.json(
      { error: "Task required" },
      { status: 400 }
    );
    }

    await connectDB()

    const newTask=await Task.create({
        task,
        user:token.id
    })

    if(!newTask){
         return NextResponse.json(
      { error: "Failed To Create Task" },
      { status: 400 }
    );
    }

     return NextResponse.json({ message: "Task Created successfully",task });
  
    
   
    
}