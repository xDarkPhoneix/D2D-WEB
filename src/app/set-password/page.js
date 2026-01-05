"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SetPassword() {
  const { data: session ,status} = useSession();
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const router = useRouter();

  useEffect(()=>{
    
  },[status])

  const submit = async (e) => {
     e.preventDefault();
     try {
        setLoading(true)
        const config={
           headers: { "Content-Type": "application/json" },
        }   
    console.log(session.user.email);
    
    const res=await axios.post("/api/auth/set-password",
        {email: session.user.email,password}
        ,config)
        setLoading(false)
         } catch (error) {
            setLoading(false)
        throw new error
     }
    
    router.push("/login")
    
  };

  return (
    // <div>
    //   <h2>Set Password</h2>
    //   <input
    //     type="password"
    //     placeholder="Create password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={submit}>Save Password</button>
    // </div>

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Set Password
            </h2>
    
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button
                type="submit"
               
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold disabled:opacity-50"
              >
               {loading ? "Saving password..." : "Save Password"}
              </button>
    
              
            </form>
    
           
          </div>
        </div>
  );
}
