'use client';

import React, { useState } from 'react';
import { useApp, UserProfile } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { ProfileSkeleton } from '@/components/Skeletons';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Bookmark, 
  Activity, 
  Award, 
  Edit, 
  Check, 
  X, 
  Heart, 
  Settings as SettingsIcon,
  Compass
} from 'lucide-react';

export default function ProfilePage() {
  const { userProfile, setUserProfile, savedOpportunityIds, registeredOpportunityIds, completedOpportunityIds } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit Form State
  const [name, setName] = useState(userProfile?.name || '');
  const [college, setCollege] = useState(userProfile?.college || '');
  const [degree, setDegree] = useState(userProfile?.degree || '');
  const [branch, setBranch] = useState(userProfile?.branch || '');
  const [year, setYear] = useState(userProfile?.year || '');
  const [location, setLocation] = useState(userProfile?.location || '');
  const [distancePref, setDistancePref] = useState(userProfile?.distancePreference || 10);
  
  const [interestsInput, setInterestsInput] = useState(userProfile?.interests.join(', ') || '');
  const [skillsInput, setSkillsInput] = useState(userProfile?.skills.join(', ') || '');

  const handleSave = () => {
    if (!userProfile) return;

    const updatedProfile: UserProfile = {
      ...userProfile,
      name,
      college,
      degree,
      branch,
      year,
      location,
      distancePreference: distancePref,
      interests: interestsInput.split(',').map((s) => s.trim()).filter((s) => s !== ''),
      skills: skillsInput.split(',').map((s) => s.trim()).filter((s) => s !== ''),
    };

    setUserProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset inputs to context values
    if (userProfile) {
      setName(userProfile.name);
      setCollege(userProfile.college);
      setDegree(userProfile.degree);
      setBranch(userProfile.branch);
      setYear(userProfile.year);
      setLocation(userProfile.location);
      setDistancePref(userProfile.distancePreference);
      setInterestsInput(userProfile.interests.join(', '));
      setSkillsInput(userProfile.skills.join(', '));
    }
    setIsEditing(false);
  };

  if (!userProfile) {
    return (
      <DashboardShell>
        <ProfileSkeleton />
      </DashboardShell>
    );
  }

  // Calculate statistics
  const savedCount = savedOpportunityIds.length;
  const registeredCount = registeredOpportunityIds.length;
  const completedCount = completedOpportunityIds.length;

  // Profile completion meter
  const calculateCompletion = () => {
    let score = 0;
    if (userProfile.name) score += 15;
    if (userProfile.college) score += 15;
    if (userProfile.degree) score += 10;
    if (userProfile.branch) score += 10;
    if (userProfile.year) score += 10;
    if (userProfile.interests.length > 0) score += 15;
    if (userProfile.skills.length > 0) score += 15;
    if (userProfile.location) score += 10;
    return score;
  };

  const completionPercent = calculateCompletion();

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">My Profile</h1>
            <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Manage your credentials and matching parameters</p>
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

        {/* Profile Card View / Edit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main profile section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
              {/* Avatar + Basic details */}
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border-b border-slate-50 pb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-3xl font-black shadow-inner uppercase">
                  {name.charAt(0)}
                </div>
                
                <div className="space-y-1.5 flex-1">
                  {!isEditing ? (
                    <>
                      <h2 className="text-xl font-black text-slate-950">{userProfile.name}</h2>
                      <p className="text-xs text-slate-500 font-semibold flex items-center justify-center sm:justify-start gap-1">
                        <GraduationCap className="w-4 h-4 text-slate-400" />
                        <span>{userProfile.degree} in {userProfile.branch} • {userProfile.year}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{userProfile.location} (Max radius: {userProfile.distancePreference} km)</span>
                      </p>
                    </>
                  ) : (
                    <div className="space-y-4 w-full text-xs font-semibold text-slate-600">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Location</label>
                          <select 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                          >
                            <option>Delhi</option>
                            <option>Noida</option>
                            <option>Greater Noida</option>
                            <option>Gurugram</option>
                            <option>Ghaziabad</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Education section in Edit Mode */}
              {isEditing && (
                <div className="space-y-4 border-b border-slate-50 pb-6 text-xs font-semibold text-slate-600">
                  <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-1.5">Education details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">College</label>
                      <input 
                        type="text" 
                        value={college} 
                        onChange={(e) => setCollege(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Academic Year</label>
                      <select 
                        value={year} 
                        onChange={(e) => setYear(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                        <option>Postgraduate</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Degree</label>
                      <select 
                        value={degree} 
                        onChange={(e) => setDegree(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                      >
                        <option>B.Tech</option>
                        <option>BCA</option>
                        <option>MCA</option>
                        <option>M.Tech</option>
                        <option>B.Sc</option>
                        <option>M.Sc</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Branch</label>
                      <input 
                        type="text" 
                        value={branch} 
                        onChange={(e) => setBranch(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Interests & Skills Cards */}
              <div className="space-y-5">
                {/* Interests */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interests</h3>
                  {!isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {userProfile.interests.map((interest) => (
                        <Badge key={interest} variant="primary">{interest}</Badge>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Interests (comma separated)</label>
                      <input 
                        type="text" 
                        value={interestsInput} 
                        onChange={(e) => setInterestsInput(e.target.value)} 
                        placeholder="Artificial Intelligence, Web Development, Hackathons"
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium text-xs"
                      />
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills</h3>
                  {!isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Skills (comma separated)</label>
                      <input 
                        type="text" 
                        value={skillsInput} 
                        onChange={(e) => setSkillsInput(e.target.value)} 
                        placeholder="Python, React, Machine Learning, SQL"
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium text-xs"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Completion Pane */}
          <div className="lg:col-span-4 space-y-6">
            {/* Completion Index */}
            <div className="bg-indigo-950 text-indigo-200 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Profile Completion</h3>
              
              <div className="flex items-baseline justify-between">
                <span className="text-xs">Discovery Precision</span>
                <span className="text-2xl font-black text-white">{completionPercent}%</span>
              </div>

              {/* Bar meter */}
              <div className="w-full h-2.5 bg-indigo-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${completionPercent}%` }}></div>
              </div>

              <p className="text-[10px] leading-relaxed text-indigo-300">
                Completing education details, location coordinates, and skill tags increases recommendation accuracy.
              </p>
            </div>

            {/* Statistics Row */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activities Ledger</h3>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                  <Bookmark className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <span className="text-base font-extrabold text-slate-900">{savedCount}</span>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">Saved</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                  <Activity className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <span className="text-base font-extrabold text-slate-900">{registeredCount}</span>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">Joined</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                  <Award className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <span className="text-base font-extrabold text-slate-900">{completedCount}</span>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
