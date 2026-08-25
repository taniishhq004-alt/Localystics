'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Compass, 
  Home, 
  MapPin, 
  Bookmark, 
  Activity, 
  User, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  Layers, 
  PlusSquare, 
  LineChart,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Badge } from './Badge';

// Desktop Sidebar Component
export function Sidebar() {
  const pathname = usePathname();
  const { role, setRole, userProfile } = useApp();
  const router = useRouter();

  const isStudent = role === 'Student';

  // Navigation Items
  const studentNavItems = [
    { label: 'For You', icon: Home, href: '/for-you' },
    { label: 'Explore', icon: Compass, href: '/explore' },
    { label: 'Near Me', icon: MapPin, href: '/near-me' },
    { label: 'Saved', icon: Bookmark, href: '/saved' },
    { label: 'My Activities', icon: Activity, href: '/activities' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  const hostNavItems = [
    { label: 'Host Dashboard', icon: Layers, href: '/host' },
    { label: 'My Opportunities', icon: Activity, href: '/host/opportunities' },
    { label: 'Create Opportunity', icon: PlusSquare, href: '/host/opportunities/create' },
    { label: 'Host Analytics', icon: LineChart, href: '/host/analytics' },
    { label: 'Host Profile', icon: User, href: '/host/profile' },
  ];

  const navItems = isStudent ? studentNavItems : hostNavItems;

  const handleRoleToggle = () => {
    const nextRole = isStudent ? 'Host' : 'Student';
    setRole(nextRole);
    router.push(isStudent ? '/host' : '/for-you');
  };

  return (
    <aside className="fixed inset-y-0 left-0 hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-400 z-30">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center border-b border-slate-800 gap-2.5">
        <div className="relative w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 to-indigo-500"></div>
          {/* Radar / Pin Logo Icon */}
          <Compass className="relative w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="font-black text-white text-base tracking-wider">LOCALYSTIC</span>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Discovery Engine</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Role Switcher & Bottom Actions */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={handleRoleToggle}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-indigo-500" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Current Persona</p>
              <p className="text-xs font-bold text-white">{role} view</p>
            </div>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700">
            Switch
          </span>
        </button>

        <div className="mt-4 flex items-center justify-between px-3 text-xs">
          <Link href="/settings" className="hover:text-slate-200 flex items-center gap-1.5 font-semibold">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <Link href="/login" className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-semibold">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

// Top Navbar Component (Notifications, Mobile Menu, Profile)
export function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { notifications, markNotificationRead, markAllNotificationsAsRead, userProfile, role, setRole } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markNotificationRead(id);
  };

  const isStudent = role === 'Student';

  // Mobile Navigation items
  const studentNavItems = [
    { label: 'For You', icon: Home, href: '/for-you' },
    { label: 'Explore', icon: Compass, href: '/explore' },
    { label: 'Near Me', icon: MapPin, href: '/near-me' },
    { label: 'Saved', icon: Bookmark, href: '/saved' },
    { label: 'My Activities', icon: Activity, href: '/activities' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  const hostNavItems = [
    { label: 'Host Dashboard', icon: Layers, href: '/host' },
    { label: 'My Opportunities', icon: Activity, href: '/host/opportunities' },
    { label: 'Create Opportunity', icon: PlusSquare, href: '/host/opportunities/create' },
    { label: 'Host Analytics', icon: LineChart, href: '/host/analytics' },
    { label: 'Host Profile', icon: User, href: '/host/profile' },
  ];

  const navItems = isStudent ? studentNavItems : hostNavItems;

  const handleRoleToggle = () => {
    const nextRole = isStudent ? 'Host' : 'Student';
    setRole(nextRole);
    setMobileMenuOpen(false);
    router.push(isStudent ? '/host' : '/for-you');
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between z-20 shadow-sm">
        {/* Search Input Abstraction */}
        <div className="relative max-w-md w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search opportunities (e.g. AI hackathons near Delhi)"
            onClick={() => router.push('/explore')}
            className="w-full bg-slate-50 hover:bg-slate-100/80 border border-transparent hover:border-slate-200 focus:bg-white focus:border-indigo-500 pl-10 pr-4 py-2 rounded-xl text-sm transition-all duration-200 outline-none text-slate-800 cursor-pointer"
            readOnly
          />
        </div>

        {/* Brand placeholder for Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white">
            <Compass className="w-4.5 h-4.5" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-wider text-sm">LOCALYSTIC</span>
        </div>

        {/* Right Toolbar */}
        <div className="flex items-center gap-4.5">
          {/* Notification Icon & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Dropdown Card */}
            {showNotifications && (
              <div className="absolute right-0 mt-3.5 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-40 overflow-hidden animate-scale-up">
                <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                  <span className="font-bold text-slate-950 text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id)}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-indigo-50/20' : ''
                        }`}
                      >
                        <p className={`text-xs text-slate-700 leading-normal ${!notif.read ? 'font-medium' : ''}`}>
                          {notif.message}
                        </p>
                        <span className="text-[9px] text-slate-400 block mt-1">{notif.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User profile segment */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {userProfile ? userProfile.name : 'Ayaan'}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                {role === 'Student' ? 'STUDENT' : 'ORGANIZER'}
              </p>
            </div>

            <Link href={role === 'Student' ? '/profile' : '/host/profile'}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 border border-indigo-100 flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                {(userProfile ? userProfile.name : 'Ayaan').charAt(0)}
              </div>
            </Link>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Menu Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden bg-slate-900/40 backdrop-blur-sm">
          <div className="w-72 bg-slate-950 h-full p-6 flex flex-col justify-between text-slate-400 animate-slide-in">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-7.5 h-7.5 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Compass className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-extrabold text-white text-base tracking-wider">LOCALYSTIC</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                          : 'hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleRoleToggle}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-indigo-500" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Switch Persona</p>
                    <p className="text-xs font-bold text-white">{role} View</p>
                  </div>
                </div>
              </button>

              <div className="flex items-center justify-between px-3 text-xs pt-2 border-t border-slate-900">
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-200 flex items-center gap-1.5 font-semibold">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5 font-semibold">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Mobile Bottom Navigation Bar (For Quick Mobile Tapping)
export function MobileNavigation() {
  const pathname = usePathname();
  const { role } = useApp();

  const isStudent = role === 'Student';

  // Bottom Links
  const studentLinks = [
    { label: 'For You', icon: Home, href: '/for-you' },
    { label: 'Explore', icon: Compass, href: '/explore' },
    { label: 'Near Me', icon: MapPin, href: '/near-me' },
    { label: 'Saved', icon: Bookmark, href: '/saved' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  const hostLinks = [
    { label: 'Dashboard', icon: Layers, href: '/host' },
    { label: 'Events', icon: Activity, href: '/host/opportunities' },
    { label: 'Create', icon: PlusSquare, href: '/host/opportunities/create' },
    { label: 'Analytics', icon: LineChart, href: '/host/analytics' },
    { label: 'Profile', icon: User, href: '/host/profile' },
  ];

  const links = isStudent ? studentLinks : hostLinks;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around px-2 lg:hidden z-20 shadow-lg">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full text-[10px] font-bold transition-all duration-200 ${
              isActive 
                ? 'text-indigo-600' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate max-w-[64px]">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
