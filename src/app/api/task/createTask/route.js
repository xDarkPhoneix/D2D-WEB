import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/models/task.model";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function POST(req) {
  // 🔐 user auth
   
    const token=await getToken({req})
    console.log(token);
    

    if(!token && token.role!=="user"){
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
    }
   

  try {
    const body = await req.json();
    const { serviceName, category, description } = body;
    console.log(body);
    

    // basic validation
    if (!serviceName || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Service name and category are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const service = await Task.create({
      serviceName,
      category,
      description,
      requestedBy: token.email,
      user: token.id,
      status: "pending", // 🔒 enforced
    }); 


    // if (!service) {
    //     throw new Error(error)
    // }
    

    return NextResponse.json(
      {
        success: true,
        message: "Service request submitted successfully",
        data: service,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create service request",
      },
      { status: 500 }
    );
  }
}
