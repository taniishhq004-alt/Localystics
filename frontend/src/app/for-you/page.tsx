'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { OpportunityCard } from '@/components/OpportunityCard';
import { OpportunityService, calculateDistance } from '@/services/opportunities';
import { Opportunity } from '@/data/mockOpportunities';
import { GridSkeleton } from '@/components/Skeletons';
import { Sparkles, Calendar, MapPin, Zap, Flame, Compass } from 'lucide-react';
import Link from 'next/link';

export default function ForYouPage() {
  const { userProfile, opportunities } = useApp();
  const [loading, setLoading] = useState(true);
  
  const [topMatches, setTopMatches] = useState<Opportunity[]>([]);
  const [recommended, setRecommended] = useState<Opportunity[]>([]);
  const [closingSoon, setClosingSoon] = useState<Opportunity[]>([]);
  const [nearYou, setNearYou] = useState<Opportunity[]>([]);

  useEffect(() => {
    async function loadFeed() {
      if (!userProfile) return;
      setLoading(true);
      
      try {
        // Fetch recommendations passing dynamic opportunities state
        const allRecs = await OpportunityService.getRecommendations(
          {
            interests: userProfile.interests,
            skills: userProfile.skills,
            location: userProfile.location,
            latitude: userProfile.latitude,
            longitude: userProfile.longitude,
            distancePreference: userProfile.distancePreference,
          },
          opportunities
        );

        // 1. Top Matches (Match index >= 90, limit to 3)
        const tops = allRecs.filter((o) => o.matchScore >= 90).slice(0, 3);
        setTopMatches(tops);

        // 2. Closing Soon (Deadline <= 3 days away)
        const closing = allRecs
          .filter((o) => {
            const daysLeft = Math.ceil(
              (new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );
            return daysLeft >= 0 && daysLeft <= 3;
          })
          .slice(0, 3);
        setClosingSoon(closing);

        // 3. Near You (Offline and distance <= user preference)
        const nearby = allRecs
          .filter((o) => {
            if (o.mode === 'Online') return false;
            const distance = calculateDistance(
              userProfile.latitude,
              userProfile.longitude,
              o.latitude,
              o.longitude
            );
            return distance <= userProfile.distancePreference;
          })
          .slice(0, 3);
        setNearYou(nearby);

        // 4. Remaining General Recommendations
        const topIds = new Set(tops.map((o) => o.id));
        const general = allRecs.filter((o) => !topIds.has(o.id)).slice(0, 6);
        setRecommended(general);
      } catch (err) {
        console.error('Failed to load personalized feed', err);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, [userProfile, opportunities]);

  return (
    <DashboardShell>
      <div className="space-y-10">
        {/* Header Greeting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-none">
              Good morning, {userProfile?.name || 'Ayaan'} 👋
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-wider">
              Opportunities selected for you based on your interests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{userProfile?.location || 'Delhi'}, NCR</span>
            </span>
            <span className="text-xs text-slate-500 font-semibold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>Matching feed active</span>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded w-1/4 animate-pulse"></div>
              <GridSkeleton count={3} />
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded w-1/4 animate-pulse"></div>
              <GridSkeleton count={3} />
            </div>
          </div>
        ) : (
          <>
            {/* Section 1: Top Matches */}
            {topMatches.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-black text-slate-950 tracking-tight">Top Matches</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topMatches.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Closing Soon */}
            {closingSoon.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  <h2 className="text-lg font-black text-slate-950 tracking-tight">Closing Soon</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {closingSoon.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Near You */}
            {nearYou.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-black text-slate-950 tracking-tight">Opportunities Near You</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {nearYou.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Recommended for you */}
            {recommended.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-slate-600" />
                  <h2 className="text-lg font-black text-slate-950 tracking-tight">Recommended For You</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommended.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  ))}
                </div>
              </div>
            )}

            {topMatches.length === 0 && recommended.length === 0 && (
              <div className="bg-white border border-slate-100 p-12 text-center rounded-3xl shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">No personalized matches found</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try updating your interests, skills, or city location in Settings to expand our discovery radar.
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/settings">
                    <button className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
                      Edit Profile Preferences
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardShell>
  );
}
