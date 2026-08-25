'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  Building, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  Award, 
  Bookmark, 
  Share2, 
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { Badge } from '@/components/Badge';
import { DeadlineBadge } from '@/components/DeadlineBadge';
import { MatchScore } from '@/components/MatchScore';
import { Button } from '@/components/Button';
import { Opportunity } from '@/data/mockOpportunities';

import MapView from '@/components/MapView';

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { opportunities, savedOpportunityIds, registeredOpportunityIds, toggleSaveOpportunity, registerForOpportunity, userProfile } = useApp();
  
  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    // Find opportunity in list
    const found = opportunities.find((o) => o.id === id);
    setOpp(found || null);
    setLoading(false);
  }, [id, opportunities]);

  if (loading) {
    return (
      <DashboardShell>
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-slate-200 rounded w-1/4"></div>
          <div className="h-40 bg-slate-200 rounded-3xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-80 bg-slate-200 rounded-3xl"></div>
            <div className="h-60 bg-slate-200 rounded-3xl"></div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (!opp) {
    return (
      <DashboardShell>
        <div className="bg-white border border-slate-100 p-16 text-center rounded-3xl shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <MapPin className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">Opportunity Not Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              This event may have been cancelled, closed, or moved by the organizer.
            </p>
          </div>
          <div className="pt-2">
            <Button size="sm" className="font-bold text-xs" onClick={() => router.push('/explore')}>
              Back to Catalog
            </Button>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const isSaved = savedOpportunityIds.includes(opp.id);
  const isRegistered = registeredOpportunityIds.includes(opp.id);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    registerForOpportunity(opp.id);
    setIsRegistering(false);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Back Link */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>

        {/* Opportunity Title Header */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={opp.category === 'Hackathons' ? 'primary' : opp.category === 'Internships' ? 'success' : 'secondary'}>
                {opp.category}
              </Badge>
              {opp.mode === 'Online' && <Badge variant="info">Online</Badge>}
              {opp.source === 'HOST' && <Badge variant="success">Verified Host</Badge>}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-snug">
              {opp.title}
            </h1>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Building className="w-4 h-4 text-slate-400" />
              <span>{opp.host}</span>
              {opp.source === 'EXTERNAL' && (
                <span className="text-slate-400 font-semibold flex items-center">
                  • via {opp.sourceName} <ExternalLink className="w-3 h-3 ml-0.5" />
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MatchScore score={opp.matchScore} reasons={opp.matchReasons} category={opp.category} />
            <button
              onClick={() => toggleSaveOpportunity(opp.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100'
                  : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600 hover:border-slate-200'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save opportunity'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600 hover:border-slate-200 transition-colors"
              title="Copy link to clipboard"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {isCopied && <span className="text-[10px] text-emerald-600 font-bold">Link copied!</span>}
          </div>
        </div>

        {/* Details and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider border-b border-slate-50 pb-2">About the Opportunity</h2>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{opp.description}</p>
            </div>

            {/* Eligibility & Skills */}
            <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Eligibility</h3>
                <p className="text-xs text-slate-700 font-semibold bg-slate-50 border border-slate-100 p-3.5 rounded-xl leading-normal">
                  {opp.eligibility}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {opp.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-50/50 text-indigo-700 border border-indigo-100 rounded-xl"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hyperlocal Proximity Map Preview */}
            <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-950 uppercase tracking-wider border-b border-slate-50 pb-2">Location & Map Preview</h2>
              
              {opp.mode === 'Online' ? (
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Fully Virtual / Online Event</h4>
                  <p className="text-[10px] text-slate-400 leading-normal max-w-xs mx-auto">
                    This event is hosted virtually. Link credentials will be provided in your dashboard closer to start date.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <MapPin className="w-4.5 h-4.5 text-rose-500" />
                      <span>{opp.location}</span>
                    </span>
                    {userProfile && (
                      <span className="text-[10px] bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg font-bold">
                        Target City: {opp.city}
                      </span>
                    )}
                  </div>
                  
                  {/* Leaflet map container */}
                  <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                    <MapView 
                      userLat={userProfile?.latitude || 28.6139}
                      userLng={userProfile?.longitude || 77.2090}
                      radiusKm={userProfile?.distancePreference || 15}
                      opportunities={[opp]}
                      selectedOpportunityId={opp.id}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Registration panel */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-md text-xs font-medium space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Highlights</h3>
              
              <div className="space-y-4.5 border-b border-slate-50 pb-4.5 text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-400" /> Price</span>
                  <span className="font-bold text-slate-900">{opp.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> Deadline</span>
                  <DeadlineBadge deadlineISO={opp.deadline} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Event Date</span>
                  <span className="font-bold text-slate-900">{opp.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Award className="w-4 h-4 text-slate-400" /> Mode</span>
                  <Badge variant={opp.mode === 'Online' ? 'info' : 'secondary'}>{opp.mode}</Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3.5">
                {isRegistered ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs">
                    <CheckCircle className="w-4.5 h-4.5" />
                    <span>You are registered</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleRegister}
                    isLoading={isRegistering}
                    className="w-full font-bold py-3.5 shadow-md shadow-indigo-600/10 text-xs rounded-xl"
                  >
                    Register Now
                  </Button>
                )}

                {opp.source === 'EXTERNAL' && (
                  <a 
                    href={opp.sourceUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center font-bold text-xs border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-xl transition-all gap-1.5"
                  >
                    <span>Visit External Host Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Why we match score breakdown */}
            <div className="bg-indigo-950 text-indigo-200 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Personalization Index</h3>
              
              <div className="flex items-baseline justify-between">
                <span className="text-xs">Match Accuracy</span>
                <span className="text-2xl font-black text-white">{opp.matchScore}%</span>
              </div>
              
              <ul className="space-y-3.5 text-[11px] leading-relaxed text-indigo-200">
                {opp.matchReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
