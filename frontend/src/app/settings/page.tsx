'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { Button } from '@/components/Button';
import { 
  Bell, 
  Shield, 
  Smartphone, 
  Palette, 
  Trash2, 
  LogOut, 
  Lock,
  CheckCircle,
  Eye,
  Sliders
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { logout, userProfile, setUserProfile } = useApp();
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification states
  const [deadlines, setDeadlines] = useState(true);
  const [recommendations, setRecommendations] = useState(true);
  const [nearby, setNearby] = useState(true);
  
  // Privacy states
  const [gpsAccess, setGpsAccess] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);

  // Theme state
  const [theme, setTheme] = useState('light');

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Settings</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Configure notifications, privacy, and display parameters</p>
        </div>

        {saveSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-2 text-xs font-bold animate-pulse">
            <CheckCircle className="w-4.5 h-4.5" />
            <span>Settings saved successfully.</span>
          </div>
        )}

        <div className="space-y-6 text-xs text-slate-600 font-semibold">
          {/* Notification Preferences */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2 text-sm">
              <Bell className="w-4.5 h-4.5 text-indigo-500" />
              <span>Notification Reminders</span>
            </h3>

            <div className="space-y-3.5 pt-1">
              <label className="flex items-start gap-3.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={deadlines}
                  onChange={(e) => setDeadlines(e.target.checked)}
                  className="h-4.5 w-4.5 text-indigo-600 focus:ring-indigo-500 border-slate-200 rounded-lg mt-0.5"
                />
                <div>
                  <span className="text-slate-800 font-bold block">Deadline Alerts</span>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Receive warnings 48h and 24h before bookmarked event registrations close.</p>
                </div>
              </label>

              <label className="flex items-start gap-3.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={recommendations}
                  onChange={(e) => setRecommendations(e.target.checked)}
                  className="h-4.5 w-4.5 text-indigo-600 focus:ring-indigo-500 border-slate-200 rounded-lg mt-0.5"
                />
                <div>
                  <span className="text-slate-800 font-bold block">Recommendation Matches</span>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Alert me when newly created opportunities achieve a match score above 90%.</p>
                </div>
              </label>

              <label className="flex items-start gap-3.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={nearby}
                  onChange={(e) => setNearby(e.target.checked)}
                  className="h-4.5 w-4.5 text-indigo-600 focus:ring-indigo-500 border-slate-200 rounded-lg mt-0.5"
                />
                <div>
                  <span className="text-slate-800 font-bold block">Nearby Proximity Radar</span>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Receive local alerts when events are published within 5 km of your target city coordinate.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Privacy & Coordinates */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2 text-sm">
              <Shield className="w-4.5 h-4.5 text-indigo-500" />
              <span>Privacy & Map Coordinates</span>
            </h3>

            <div className="space-y-3.5 pt-1">
              <label className="flex items-start gap-3.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={gpsAccess}
                  onChange={(e) => setGpsAccess(e.target.checked)}
                  className="h-4.5 w-4.5 text-indigo-600 focus:ring-indigo-500 border-slate-200 rounded-lg mt-0.5"
                />
                <div>
                  <span className="text-slate-800 font-bold block">GPS Tracking Permission</span>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Allow the Leaflet Map panel to request active GPS location coordinates from the browser.</p>
                </div>
              </label>

              <label className="flex items-start gap-3.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={profileVisible}
                  onChange={(e) => setProfileVisible(e.target.checked)}
                  className="h-4.5 w-4.5 text-indigo-600 focus:ring-indigo-500 border-slate-200 rounded-lg mt-0.5"
                />
                <div>
                  <span className="text-slate-800 font-bold block">Profile Visibility</span>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Let event hosts and organizers inspect your skill tags and education details when you register.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Appearance Dropdown */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2 text-sm">
              <Palette className="w-4.5 h-4.5 text-indigo-500" />
              <span>Appearance</span>
            </h3>

            <div className="max-w-xs space-y-1.5 pt-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Color Palette Mode</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-indigo-500 text-slate-800 font-medium"
              >
                <option value="light">Light Minimalist (Default)</option>
                <option value="dark">Sleek Dark Mode (Coming Soon)</option>
                <option value="system">Follow Operating System</option>
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm gap-4">
            <div className="flex items-center gap-3">
              <Link href="/login" onClick={logout}>
                <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50 font-bold" leftIcon={<LogOut className="w-4 h-4" />}>
                  Sign Out
                </Button>
              </Link>
              <button className="text-[10px] text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Account</span>
              </button>
            </div>
            
            <Button size="sm" onClick={handleSaveSettings} className="font-bold text-xs shadow-sm">
              Save Parameters
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
