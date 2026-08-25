'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { OpportunityCard } from '@/components/OpportunityCard';
import { Opportunity } from '@/data/mockOpportunities';
import { GridSkeleton } from '@/components/Skeletons';
import { Bookmark, Compass } from 'lucide-react';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function SavedPage() {
  const { savedOpportunityIds, opportunities } = useApp();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'closing' | 'upcoming'>('all');
  const [savedOpps, setSavedOpps] = useState<Opportunity[]>([]);

  useEffect(() => {
    setLoading(true);
    // Filter opportunities list by saved IDs
    const filtered = opportunities.filter((o) => savedOpportunityIds.includes(o.id));
    
    if (activeTab === 'closing') {
      const closing = filtered.filter((o) => {
        const daysLeft = Math.ceil(
          (new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
        return daysLeft >= 0 && daysLeft <= 3;
      });
      setSavedOpps(closing);
    } else if (activeTab === 'upcoming') {
      const upcoming = filtered.filter((o) => {
        const daysLeft = Math.ceil(
          (new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
        return daysLeft > 3;
      });
      setSavedOpps(upcoming);
    } else {
      setSavedOpps(filtered);
    }
    
    setLoading(false);
  }, [savedOpportunityIds, opportunities, activeTab]);

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Saved Opportunities</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Review and manage bookmarked events</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-slate-100 max-w-sm">
          {(['all', 'closing', 'upcoming'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 capitalize transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'closing' ? 'Closing Soon' : tab}
            </button>
          ))}
        </div>

        {/* Results grid */}
        <div>
          {loading ? (
            <GridSkeleton count={3} />
          ) : savedOpps.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-slate-100 p-16 text-center rounded-3xl shadow-sm space-y-4 max-w-lg mx-auto mt-6">
              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                <Bookmark className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">
                  {activeTab === 'all' 
                    ? "You haven't saved anything yet"
                    : activeTab === 'closing'
                    ? "No saved opportunities closing soon"
                    : "No upcoming saved opportunities"}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Bookmark events while exploring the catalog to monitor deadlines and quick-launch registration profiles.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/explore">
                  <Button size="sm" className="font-bold text-xs">
                    Explore Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedOpps.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
