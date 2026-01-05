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

    const {taskId,status}=await req.json();

    if(!taskId || !status){
         return NextResponse.json(
      { error: "TaskId or Status Missing" },
      { status: 400 }
    );
    }
    
    const task=await Task.findByIdAndUpdate(taskId,
        {
            $set:{
                status:status,
                verifiedBy:token.id
            }
        },
        {
            new:true
        }
    ).populate("verifiedBy","email role")
        

    


    if(!task){
         return NextResponse.json(
      { error: "Failed To update Task" },
      { status: 400 }
    );
    }

     return NextResponse.json({ message: "Task Updated successfully",task });
  
    
   
    
}