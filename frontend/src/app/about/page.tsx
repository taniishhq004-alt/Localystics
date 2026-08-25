'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, Mail, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-wider text-base">LOCALYSTIC</span>
          </Link>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="font-bold" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">
            About Localystic
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed font-semibold">
            Discover opportunities that matter to you.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Localystic was created because finding high-quality local opportunities—like hackathons, internships, technical workshops, and volunteering drives—is unnecessarily fragmented. Students spend hours scouring multiple platforms (Unstop, Devpost, Eventbrite, LinkedIn), while local organizers struggle to reach students within their immediate geographic vicinity.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            By building a localized, personalized recommendation engine, we bridge this gap. Localystic doesn’t simply aggregate opportunities—it understands your interests, academic level, specific skills, and travel preferences to show you only the events that are worth your time.
          </p>
        </div>

        {/* Conceptual Architecture Diagram */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">How Personalization Works</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            When you register, you complete a quick onboarding quiz to build your preference vectors. When we fetch events, our match generator ranks them on a 100-point scale:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-indigo-600">Interests Alignment (40%)</span>
              <p className="text-[11px] text-slate-500 leading-normal">Evaluates the degree overlap between your academic preferences and event categories.</p>
            </div>
            <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-emerald-600">Skills Fit (30%)</span>
              <p className="text-[11px] text-slate-500 leading-normal">Matches event technical tags with skills you currently possess or want to develop.</p>
            </div>
            <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-rose-600">Travel Proximity (30%)</span>
              <p className="text-[11px] text-slate-500 leading-normal">Geolocates the event relative to your position and filters by your maximum travel range.</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Students */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950">For Students & Professionals</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span><b>Personalized Feed:</b> See events that match your profile.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span><b>Interactive Map:</b> Geolocate events and calculate metro/driving distance.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span><b>Activity Tracker:</b> Manage registered, completed, and saved opportunities.</span>
              </li>
            </ul>
          </div>

          {/* Hosts */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950">For Community & Event Hosts</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span><b>Targeted Publishing:</b> Put opportunities in front of nearby eligible students.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span><b>Host Dashboard:</b> Manage published items, view drafts, and update deadlines.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-600">
                <CheckCircle className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span><b>Analytics Insights:</b> Track impressions, saves, registrations, and conversions.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base">Have questions or want to partner?</h3>
            <p className="text-xs text-slate-400">Reach out to our NCR engineering and community team.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:support@localystic.org" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4.5 py-2.5 rounded-xl border border-slate-700 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </a>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>SIH Candidate 2026</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-semibold mt-12">
        <p>&copy; {new Date().getFullYear()} Localystic Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
