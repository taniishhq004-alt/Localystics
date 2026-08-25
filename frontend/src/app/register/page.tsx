'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Eye, EyeOff, Lock, Mail, ArrowLeft, UserPlus, User, Shield } from 'lucide-react';
import { Button } from '@/components/Button';
import { useApp } from '@/context/AppContext';

export default function RegisterPage() {
  const router = useRouter();
  const { setUserProfile, setRole, setIsOnboarded } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Student' | 'Host'>('Student');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation checks
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRole(selectedRole);

      if (selectedRole === 'Student') {
        // Set temp profile and redirect to Onboarding
        setUserProfile({
          name: name,
          college: '',
          degree: '',
          branch: '',
          year: '',
          interests: [],
          skills: [],
          location: 'Delhi',
          latitude: 28.6139,
          longitude: 77.2090,
          distancePreference: 10,
          role: 'Student',
        });
        setIsOnboarded(false); // require onboarding
        router.push('/onboarding');
      } else {
        // Set host profile and redirect to Host Dashboard
        setUserProfile({
          name: name,
          college: name + ' Organization',
          degree: 'N/A',
          branch: 'N/A',
          year: 'N/A',
          interests: [],
          skills: [],
          location: 'Noida',
          latitude: 28.6219,
          longitude: 77.3794,
          distancePreference: 50,
          role: 'Host',
        });
        setIsOnboarded(true); // hosts don't need student onboarding
        router.push('/host');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="font-bold" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow shadow-indigo-600/20">
            <Compass className="w-5.5 h-5.5" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-slate-905 tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-xs text-slate-500 font-semibold">
          Unlock personalized hyperlocal technical events.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-slate-100 shadow-sm sm:rounded-3xl sm:px-10">
          <form className="space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Role selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">
                Join as a
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('Student')}
                  className={`flex flex-col items-center justify-center p-3 border-2 rounded-2xl transition-all ${
                    selectedRole === 'Student'
                      ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-bold'
                      : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-xs">Student / User</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('Host')}
                  className={`flex flex-col items-center justify-center p-3 border-2 rounded-2xl transition-all ${
                    selectedRole === 'Host'
                      ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-bold'
                      : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Shield className="w-5 h-5 mb-1" />
                  <span className="text-xs">Event Host</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ayaan Sharma"
                className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors text-slate-800"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ayaan@example.com"
                  className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors text-slate-800"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors text-slate-800"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full font-bold py-2.5" isLoading={isLoading} rightIcon={<UserPlus className="w-4 h-4" />}>
                Register Account
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-400 font-semibold">Already have an account? </span>
            <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
