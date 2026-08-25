'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Search, 
  CheckCircle, 
  GraduationCap, 
  ArrowRight,
  Code,
  Briefcase,
  Users,
  Award,
  HeartHandshake,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

export default function LandingPage() {
  const categories = [
    { title: 'Hackathons', icon: Code, desc: 'Build prototypes and solve code challenges', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { title: 'Internships', icon: Briefcase, desc: 'Gain real-world experience at startups', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { title: 'Workshops', icon: BookOpen, desc: 'Learn hands-on technical and creative skills', color: 'text-sky-600 bg-sky-50 border-sky-100' },
    { title: 'Meetups', icon: Users, desc: 'Connect with local developer communities', color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { title: 'Competitions', icon: Award, desc: 'Compete in DSA, pitch decks & quizzes', color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { title: 'Volunteering', icon: HeartHandshake, desc: 'Give back and teach computer science skills', color: 'text-rose-600 bg-rose-50 border-rose-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow shadow-indigo-600/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-wider text-base">LOCALYSTIC</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/about" className="hover:text-indigo-600 transition-colors">How It Works</Link>
            <Link href="/explore" className="hover:text-indigo-600 transition-colors">Opportunities</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-bold">Log in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="font-bold">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden border-b border-slate-100">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <Badge variant="primary" className="px-3 py-1 text-xs">
              🚀 Discover Opportunities that Matter
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-none">
              Hyperlocal opportunities,<br />
              <span className="text-indigo-600">curated for you.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Find hackathons, internships, workshops, events and volunteering drives near you — mapped directly to your interests, skills, education, and distance preferences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto font-bold shadow-lg shadow-indigo-600/20" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get Started
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
                  Explore Opportunities
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual Opportunity mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 text-slate-400 relative">
              {/* Top gradient border shine */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs font-mono text-slate-600">Localystic Feed Mock</span>
              </div>

              <div className="space-y-4">
                {/* Mock Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4.5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 px-2 py-0.5 bg-indigo-950 border border-indigo-900 rounded-full">Hackathons</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950 border border-emerald-900 rounded-full">94% MATCH</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">AI Hackathon 2026</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Tech Labs NCR • Delhi</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Python</span>
                    <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">React</span>
                    <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Machine Learning</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px]">
                    <span className="text-rose-400 font-semibold">2 days left to register</span>
                    <span className="text-slate-500">3.2 km away</span>
                  </div>
                </div>

                {/* Match Reasons indicator */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Why it matches Ayaan:</p>
                  <ul className="space-y-1.5 text-[10px] text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Matches AI interest and B.Tech CSE details</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Within 10 km target travel range</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Localystic Section */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge variant="secondary" className="px-3 py-1 mb-3 text-xs">
            ✨ Platform Highlights
          </Badge>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-3">Why Localystic?</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed mb-12">
            Traditional directories display a generic wall of events. Localystic acts as a discovery lens, personalizing search results to fit your capabilities and physical proximity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Personalized Recommendation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calculates a match index using your interests, academic branches, and skill tags to show what fits.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Hyperlocal Map Discovery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Filter and browse events physically surrounding your college or housing with dynamic Leaflet map markers.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Multiple Categories</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aggregates hackathons, internships, meetups, competitions, and volunteering into one unified engine.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-left shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Student & Host Personas</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Specialized views for students searching for opportunities and organizers looking to publish and track them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Categories Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge variant="primary" className="px-3 py-1 mb-3 text-xs">
            🎯 Opportunity Types
          </Badge>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-3">Explore Categories</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed mb-12">
            No matter your field of study or target technical skill, Localystic matches you with events designed to help you succeed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl p-5 text-left transition-all hover:-translate-y-1 shadow-sm">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border mb-3 ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs mb-1">{cat.title}</h3>
                  <p className="text-[10px] text-slate-400 leading-normal">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge variant="secondary" className="px-3 py-1 mb-3 text-xs">
            ⚙️ Simple Guide
          </Badge>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight mb-3">How it Works</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed mb-16">
            Three simple steps to build your feed and discover local opportunities worth acting on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full text-white font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-600/10">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Tell us about yourself</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Complete a brief onboarding quiz detailing your interests, college branch, skills, and target distance.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full text-white font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-600/10">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Discover relevant opportunities</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Browse a personalized dashboard sorted by match score, complete with detailed breakdowns of why we recommended them.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full text-white font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-600/10">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Register and participate</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Save events to your board, register directly, view routes on the map, and log your achievements in My Activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none">
            Stop searching everywhere.<br />Start discovering.
          </h2>
          <p className="text-indigo-200 max-w-md mx-auto text-sm leading-relaxed font-medium">
            Join thousands of students and organizers discovering and publishing technical opportunities across the Delhi NCR region.
          </p>
          <div className="pt-4">
            <Link href="/register">
              <button className="bg-white hover:bg-indigo-50 text-indigo-900 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get Started For Free
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400 font-semibold">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-[10px]">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-wider text-xs">LOCALYSTIC</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Localystic Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
