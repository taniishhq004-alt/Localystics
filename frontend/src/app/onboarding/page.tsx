'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Grid, 
  BookOpen, 
  Wrench, 
  Map, 
  Check,
  Navigation as NavIcon
} from 'lucide-react';
import { Button } from '@/components/Button';
import { useApp, UserProfile } from '@/context/AppContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { setUserProfile, setIsOnboarded } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('2nd Year');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<'current' | 'manual'>('manual');
  const [manualCity, setManualCity] = useState('Delhi');
  const [distancePref, setDistancePref] = useState(10); // in km
  
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  // Interest options
  const interestOptions = [
    'Artificial Intelligence', 'Machine Learning', 'Web Development', 
    'App Development', 'Cybersecurity', 'Data Science', 'Robotics', 
    'UI/UX Design', 'Finance', 'Business', 'Entrepreneurship', 
    'Marketing', 'Social Impact', 'Research', 'Open Source'
  ];

  // Skill options
  const skillOptions = [
    'Python', 'React', 'JavaScript', 'HTML/CSS', 'Java', 'C++', 
    'Figma', 'AWS', 'Docker', 'Solidity', 'Flutter', 'SQL', 
    'Git', 'Public Speaking', 'Teamwork'
  ];

  // Preference options
  const preferenceOptions = [
    'Hackathons', 'Internships', 'Workshops', 'Meetups', 
    'Competitions', 'Volunteering', 'Networking', 'Conferences'
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handlePreferenceToggle = (pref: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleLocationDetection = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setLocationSuccess(true);
      setManualCity('Delhi'); // Mock detection to Delhi
    }, 1200);
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Determine lat/long coordinates based on manualCity
    const coords: Record<string, { lat: number; lng: number }> = {
      'Delhi': { lat: 28.6139, lng: 77.2090 },
      'Noida': { lat: 28.5355, lng: 77.3910 },
      'Greater Noida': { lat: 28.4744, lng: 77.5030 },
      'Gurugram': { lat: 28.4595, lng: 77.0266 },
      'Ghaziabad': { lat: 28.6692, lng: 77.4538 }
    };

    const finalCoords = coords[manualCity] || coords['Delhi'];

    const profile: UserProfile = {
      name: 'Ayaan', // Default or loaded name
      college: college || 'Example Institute of Technology',
      degree,
      branch,
      year,
      interests: selectedInterests.length > 0 ? selectedInterests : ['AI', 'Web Development'],
      skills: selectedSkills.length > 0 ? selectedSkills : ['Python', 'React'],
      location: manualCity,
      latitude: finalCoords.lat,
      longitude: finalCoords.lng,
      distancePreference: distancePref,
      role: 'Student',
    };

    setUserProfile(profile);
    setIsOnboarded(true);
    router.push('/for-you');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-6">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-slate-905 tracking-wider text-base">LOCALYSTIC</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>Step {step} of 6</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl bg-slate-200 h-1.5 rounded-full overflow-hidden mb-8">
        <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${(step / 6) * 100}%` }}></div>
      </div>

      {/* Center Container Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex-grow flex flex-col justify-between min-h-[440px]">
        <div>
          {/* STEP 1: Interests */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-950">What are you interested in?</h2>
                <p className="text-xs text-slate-400 mt-1">Select the topics you want to explore. We will use these to match events.</p>
              </div>

              <div className="flex flex-wrap gap-2.5 max-h-60 overflow-y-auto pr-1">
                {interestOptions.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Education */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-950">Tell us about your education</h2>
                <p className="text-xs text-slate-400 mt-1">This helps us match academic prerequisites and eligibility limits.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">College Name</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="Delhi Technological University (DTU)"
                    className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Degree</label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 bg-white text-slate-800"
                    >
                      <option>B.Tech</option>
                      <option>BCA</option>
                      <option>MCA</option>
                      <option>M.Tech</option>
                      <option>B.Sc</option>
                      <option>M.Sc</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Year of Study</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 bg-white text-slate-800"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Postgraduate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Academic Branch</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Computer Science & Engineering"
                    className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Skills */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-950">Select your key skills</h2>
                <p className="text-xs text-slate-400 mt-1">We will match these with hackathon requirements and internship prerequisites.</p>
              </div>

              <div className="flex flex-wrap gap-2.5 max-h-60 overflow-y-auto pr-1">
                {skillOptions.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Preferences */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-950">What opportunities are you looking for?</h2>
                <p className="text-xs text-slate-400 mt-1">Filter your primary feed to show only your selected styles.</p>
              </div>

              <div className="flex flex-wrap gap-2.5 max-h-60 overflow-y-auto pr-1">
                {preferenceOptions.map((pref) => {
                  const isSelected = selectedPreferences.includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => handlePreferenceToggle(pref)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {pref}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Location */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-950">Where are you located?</h2>
                <p className="text-xs text-slate-400 mt-1">This configures nearby coordinates to compute driving or metro travel distances.</p>
              </div>

              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setLocationType('current')}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all ${
                      locationType === 'current'
                        ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-bold'
                        : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <NavIcon className="w-5 h-5 mb-1" />
                    <span>Use GPS location</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('manual')}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all ${
                      locationType === 'manual'
                        ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-bold'
                        : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mb-1" />
                    <span>Select manually</span>
                  </button>
                </div>

                {locationType === 'current' ? (
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 text-center space-y-3">
                    <p className="text-slate-600 text-xs">
                      We require access to your browser location settings to fetch nearby hackathons.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLocationDetection}
                      isLoading={isLocating}
                      leftIcon={locationSuccess ? <Check className="w-4 h-4 text-emerald-500" /> : undefined}
                    >
                      {locationSuccess ? 'Location Detected (Delhi)' : 'Request Permission'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Select NCR City</label>
                    <select
                      value={manualCity}
                      onChange={(e) => setManualCity(e.target.value)}
                      className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 bg-white text-slate-800"
                    >
                      <option>Delhi</option>
                      <option>Noida</option>
                      <option>Greater Noida</option>
                      <option>Gurugram</option>
                      <option>Ghaziabad</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: Distance Preference */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-950">Select distance preference</h2>
                <p className="text-xs text-slate-400 mt-1">What is the maximum distance you are willing to travel for offline opportunities?</p>
              </div>

              <div className="space-y-6 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 25, 50].map((dist) => (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => setDistancePref(dist)}
                      className={`py-3.5 border-2 rounded-2xl transition-all text-center font-bold text-xs ${
                        distancePref === dist
                          ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700'
                          : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {dist} km
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setDistancePref(999)}
                    className={`py-3.5 border-2 rounded-2xl transition-all text-center font-bold text-xs col-span-2 ${
                      distancePref === 999
                        ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700'
                        : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Anywhere (NCR-wide)
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-150 p-4.5 rounded-2xl text-slate-500 leading-normal">
                  You are currently configured to receive opportunities within <b className="text-indigo-600">{distancePref === 999 ? 'Anywhere' : `${distancePref} km`}</b> from your location in <b className="text-indigo-600">{manualCity}</b>.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-8 gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            className="font-bold text-xs"
          >
            Back
          </Button>

          <Button
            onClick={handleNext}
            rightIcon={step === 6 ? undefined : <ChevronRight className="w-4 h-4" />}
            className="font-bold text-xs px-6 shadow-md shadow-indigo-600/10"
          >
            {step === 6 ? 'Build My Feed' : 'Continue'}
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400 font-semibold">
        Already completed? <Link href="/login" className="text-indigo-500 hover:underline">Log in directly</Link>
      </div>
    </div>
  );
}
