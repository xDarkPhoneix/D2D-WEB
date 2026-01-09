"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Don't redirect while loading

    if (!session) {
      // Not authenticated, redirect to login
      router.push('/login');
      return;
    } 

    console.log(session);
    

    // Redirect based on role
    if (session.user.role === "admin" || "superadmin") {
      router.push('/dashboard/admindashboard');
    } else {
      router.push('/dashboard/userdashboard');
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}

export default Dashboard;