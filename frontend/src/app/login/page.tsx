'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Eye, EyeOff, Lock, Mail, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/Button';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUserProfile, setRole } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Form Validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check role routing
      if (email.includes('host')) {
        // Log in as host
        setRole('Host');
        setUserProfile({
          name: 'NCR Tech Labs',
          college: 'NCR Tech Organizer Inc.',
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
        router.push('/host');
      } else {
        // Log in as student
        setRole('Student');
        setUserProfile({
          name: 'Ayaan',
          college: 'Example Institute of Technology',
          degree: 'B.Tech',
          branch: 'Computer Science & Engineering',
          year: '2nd Year',
          interests: ['Artificial Intelligence', 'Web Development', 'Hackathons'],
          skills: ['Python', 'React', 'Machine Learning'],
          location: 'Delhi',
          latitude: 28.6139,
          longitude: 77.2090,
          distancePreference: 10,
          role: 'Student',
        });
        router.push('/for-you');
      }
    } catch (err) {
      setError('Invalid email or password. Hint: Use host@localystic.org to view host dashboard, or any student email.');
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
          Welcome back
        </h2>
        <p className="mt-2 text-center text-xs text-slate-500 font-semibold">
          Discover opportunities that matter to you.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-slate-100 shadow-sm sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold leading-normal">
                {error}
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ayaan@example.com"
                  className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors text-slate-800"
                />
              </div>
            </div>

            {/* Password field */}
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
                  autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded-lg"
                  defaultChecked
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-600">
                  Remember me
                </label>
              </div>

              <div className="text-xs">
                <a href="#" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full font-bold py-2.5" isLoading={isLoading} rightIcon={<LogIn className="w-4 h-4" />}>
                Sign in
              </Button>
            </div>
          </form>

          {/* Social login divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-slate-400 font-semibold uppercase tracking-wider">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-200 rounded-xl bg-white text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4.5 h-4.5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.74-.08-1.3-.176-1.859H12.24z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs">
            <span className="text-slate-400 font-semibold">New to Localystic? </span>
            <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
