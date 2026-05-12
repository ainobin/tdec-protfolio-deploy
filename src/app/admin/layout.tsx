"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else if (mounted && isAuthenticated && pathname === "/admin/login") {
      router.replace("/admin");
    }
  }, [mounted, isAuthenticated, pathname, router]);

  // If on login page, always render the login page regardless of auth status
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show loading state until component mounts on client
  // This prevents hydration mismatch
  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="hidden lg:block w-64 bg-gray-900 text-white min-h-screen" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // If not authenticated after mount, show loading while redirecting
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="hidden lg:block w-64 bg-gray-900 text-white min-h-screen" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DataProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </DataProvider>
    </AuthProvider>
  );
}
