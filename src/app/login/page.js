"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Check if already logged in and redirect
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      const redirectUrl =
        session.user.role === "admin"
          ? "/dashboard/admindashboard"
          : "/dashboard/userdashboard";

      console.log("Already logged in, redirecting to:", redirectUrl);
      router.replace(redirectUrl);
    }
  }, [session, status, router]);

  if (status === "authenticated" && session?.user?.role) {
    // Prevent rendering login form while redirecting
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Redirecting...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("🚀 Form submitted - preventing default");
    setError("");
    setLoading(true);

    try {
      console.log("Calling signIn...");
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("SignIn response:", res);

      if (res?.error) {
        console.error("Login error:", res.error);
        setError(res.error);
        setLoading(false);
      } else if (res?.ok) {
        console.log("Login successful! Waiting for session update...");
        // Session will update automatically, useEffect will handle redirect
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Exception during login:", error);
      setError("An error occurred during login");
      setLoading(false);
    }
  };

  const googleSignIn = async (e) => {
    e.preventDefault();
    console.log("Google sign-in clicked");
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#141414] border border-white/10 rounded-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Welcome Back<span className="text-[#E1BB08]">.</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Log in to continue building bold things.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400">
              Email
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com  (Admins only)" 
              className="mt-2 w-full bg-transparent border-b border-gray-700 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E1BB08] transition"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400">
              Password
            </label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full bg-transparent border-b border-gray-700 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#E1BB08] transition"
            />
          </div>

          {error && <p className="text-sm text-red-400 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#E1BB08] text-black py-3 font-semibold rounded-md hover:bg-[#f2cd1f] transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-800 flex-1" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-800 flex-1" />
        </div>

        {/* Google */}
        <button
          onClick={googleSignIn}
          className="w-full border border-gray-700 text-white py-3 rounded-md hover:border-[#E1BB08] hover:text-[#E1BB08] transition"
        >
         User's Continue with Google
        </button>

        
      </div>
    </div>
  );
}
