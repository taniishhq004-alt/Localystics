'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Opportunity } from '@/data/mockOpportunities';
import { OpportunityService } from '@/services/opportunities';
import { Badge } from '@/components/Badge';
import { 
  LineChart, 
  Users, 
  Eye, 
  TrendingUp, 
  MapPin, 
  Award,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function HostAnalyticsPage() {
  const { userProfile, opportunities } = useApp();
  const [hostOpps, setHostOpps] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const hostName = userProfile?.name || 'NCR Tech Labs';

  useEffect(() => {
    async function loadAnalytics() {
      setLoading(true);
      const data = await OpportunityService.getHostOpportunities(hostName, opportunities);
      setHostOpps(data);
      setLoading(false);
    }
    loadAnalytics();
  }, [hostName, opportunities]);

  // Aggregate calculations
  const totalPublished = hostOpps.length;
  const totalRegistrations = hostOpps.reduce((sum, opp) => sum + (opp.matchScore * 2), 0);
  const totalViews = hostOpps.reduce((sum, opp) => sum + (opp.matchScore * 25), 0);
  const totalSaves = hostOpps.reduce((sum, opp) => sum + Math.floor(opp.matchScore / 2), 0);

  // Conversion rate (Registrations / Views) * 100
  const conversionRate = totalViews > 0 ? ((totalRegistrations / totalViews) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Host Analytics</h1>
        <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider font-sans">Inspect student conversion rates and engagement charts</p>
      </div>

      {loading ? (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-3 gap-6">
            <div className="h-20 bg-slate-200 rounded-2xl"></div>
            <div className="h-20 bg-slate-200 rounded-2xl"></div>
            <div className="h-20 bg-slate-200 rounded-2xl"></div>
          </div>
          <div className="h-60 bg-slate-200 rounded-3xl"></div>
        </div>
      ) : hostOpps.length === 0 ? (
        <div className="bg-white border border-slate-100 p-16 text-center rounded-3xl shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">No analytics metrics found</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Once you publish an opportunity and students start viewing, saving, and registering, analytics reports will compile here.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Conversions row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-500 font-semibold text-xs">
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="uppercase text-[9px] font-bold text-slate-400 tracking-wider">Conversion Rate</p>
                <p className="text-2xl font-black text-slate-950 mt-1">{conversionRate}%</p>
                <p className="text-[10px] text-slate-400 font-medium">Views to Registrations ratio</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="uppercase text-[9px] font-bold text-slate-400 tracking-wider">Avg Registrants Match</p>
                <p className="text-2xl font-black text-slate-950 mt-1">86.4%</p>
                <p className="text-[10px] text-slate-400 font-medium">Relevance quality score</p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl text-amber-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="uppercase text-[9px] font-bold text-slate-400 tracking-wider">Top Geolocation</p>
                <p className="text-2xl font-black text-slate-950 mt-1">{userProfile?.location || 'Noida'}</p>
                <p className="text-[10px] text-slate-400 font-medium">Most active student subregion</p>
              </div>
            </div>
          </div>

          {/* Registration charts */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <h2 className="text-base font-bold text-slate-950">Registration Levels by Opportunity</h2>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total: {totalRegistrations}</span>
            </div>

            <div className="space-y-5 text-xs text-slate-500 font-semibold">
              {hostOpps.map((opp) => {
                const regCount = opp.matchScore * 2;
                const percent = Math.min(((regCount / 300) * 100), 100);
                return (
                  <div key={opp.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">{opp.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{regCount} registered</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
