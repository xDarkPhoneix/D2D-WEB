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
      const redirectUrl = session.user.role === "admin"
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

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
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={googleSignIn}
          className="w-full mt-4 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
