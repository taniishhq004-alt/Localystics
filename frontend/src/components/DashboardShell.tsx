'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, Navbar, MobileNavigation } from './Navigation';
import { useApp } from '@/context/AppContext';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { userProfile, isOnboarded } = useApp();
  const router = useRouter();

  // Redirect to login if user profile is missing, or onboarding if not completed
  useEffect(() => {
    if (!userProfile) {
      router.push('/login');
    } else if (!isOnboarded) {
      router.push('/onboarding');
    }
  }, [userProfile, isOnboarded, router]);

  if (!userProfile || !isOnboarded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Navbar />
      
      {/* Container spacing: left-margin on desktop for sidebar, top-margin for navbar, bottom-margin for mobile menu */}
      <div className="lg:pl-64 pt-16 pb-20 lg:pb-6">
        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}
