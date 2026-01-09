import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/user.model";
import bcrypt from "bcrypt"

export async function POST(request) {
  try {
    const { email, password , role ,name} = await request.json();
     var isVerified=false
    
    if (!email || !password || !role || !name) {
      return Response.json({ error: "Email or password missing" }, { status: 400 });
    }

    if(role==="admin" || role==="projectmanager"){
       isVerified=false
    }

    const hashedpas=await bcrypt.hash(password, 10);

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    await User.create({name, email, password:hashedpas,role,isVerified });

    return Response.json({ message: `${role} requested for verification` }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return Response.json({ error: "User registration failed" }, { status: 500 });
  }
}
