'use client';

import React, { useState } from 'react';
import { useApp, UserProfile } from '@/context/AppContext';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { 
  Shield, 
  MapPin, 
  Mail, 
  Edit, 
  Check, 
  X, 
  Layers, 
  Users,
  Compass
} from 'lucide-react';

export default function HostProfilePage() {
  const { userProfile, setUserProfile, opportunities } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Edit states
  const [name, setName] = useState(userProfile?.name || 'NCR Tech Labs');
  const [company, setCompany] = useState(userProfile?.college || 'NCR Tech Organizer Inc.');
  const [location, setLocation] = useState(userProfile?.location || 'Noida');
  const [email, setEmail] = useState('host@ncrtechlabs.org');
  const [bio, setBio] = useState('We organize premium developer workshops and hackathons across Delhi NCR, helping students connect with industry mentors.');

  const handleSave = () => {
    if (!userProfile) return;

    setUserProfile({
      ...userProfile,
      name,
      college: company,
      location,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (userProfile) {
      setName(userProfile.name);
      setCompany(userProfile.college);
      setLocation(userProfile.location);
    }
    setIsEditing(false);
  };

  // Compile opportunities stats
  const publishedCount = opportunities.filter((o) => o.host.toLowerCase() === (userProfile?.name || 'NCR Tech Labs').toLowerCase()).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Host Profile</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Manage your organizer branding details</p>
        </div>
        {!isEditing ? (
          <Button size="sm" onClick={() => setIsEditing(true)} leftIcon={<Edit className="w-4 h-4" />} className="font-bold text-xs">
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleCancel} leftIcon={<X className="w-4 h-4" />} className="font-bold text-xs">
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} leftIcon={<Check className="w-4 h-4" />} className="font-bold text-xs bg-emerald-600 hover:bg-emerald-700">
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border-b border-slate-50 pb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white text-3xl font-black shadow-inner uppercase">
                {name.charAt(0)}
              </div>

              <div className="space-y-1.5 flex-grow">
                {!isEditing ? (
                  <>
                    <h2 className="text-xl font-black text-slate-950 flex items-center justify-center sm:justify-start gap-1.5">
                      <span>{name}</span>
                      <span title="Verified Organizer">
                        <Shield className="w-4.5 h-4.5 text-emerald-500 fill-current" />
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold">{company}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{location}, NCR</span>
                    </p>
                  </>
                ) : (
                  <div className="space-y-3.5 text-xs font-semibold text-slate-600">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Host Name *</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Company / Organization *</label>
                        <input 
                          type="text" 
                          value={company} 
                          onChange={(e) => setCompany(e.target.value)} 
                          className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional info */}
            <div className="space-y-5 text-xs">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Information</h3>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-slate-700 font-semibold">
                  <Mail className="w-4.5 h-4.5 text-indigo-500" />
                  <span>{email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Organizer Biography</h3>
                {!isEditing ? (
                  <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-2xl font-semibold">
                    {bio}
                  </p>
                ) : (
                  <div>
                    <textarea 
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-slate-800 outline-none focus:border-indigo-500 font-semibold text-xs leading-normal"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="lg:col-span-4 space-y-6 text-xs text-slate-500 font-semibold">
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Publishing Statistics</h3>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <Layers className="w-4.5 h-4.5 text-indigo-600 mx-auto mb-1.5" />
                <span className="text-xl font-extrabold text-slate-905 block">{publishedCount}</span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Published</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <Users className="w-4.5 h-4.5 text-indigo-600 mx-auto mb-1.5" />
                <span className="text-xl font-extrabold text-slate-905 block">{publishedCount * 45}</span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Attendees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
