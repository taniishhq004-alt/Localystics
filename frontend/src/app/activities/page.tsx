'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { Opportunity } from '@/data/mockOpportunities';
import { Activity, Compass, Calendar, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/Badge';
import Link from 'next/link';

export default function ActivitiesPage() {
  const { registeredOpportunityIds, savedOpportunityIds, completedOpportunityIds, opportunities } = useApp();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'registered' | 'saved' | 'completed'>('registered');
  const [list, setList] = useState<Opportunity[]>([]);

  useEffect(() => {
    setLoading(true);
    let ids: string[] = [];
    if (activeTab === 'saved') {
      ids = savedOpportunityIds;
    } else if (activeTab === 'completed') {
      ids = completedOpportunityIds;
    } else {
      ids = registeredOpportunityIds;
    }

    const filtered = opportunities.filter((o) => ids.includes(o.id));
    setList(filtered);
    setLoading(false);
  }, [activeTab, registeredOpportunityIds, savedOpportunityIds, completedOpportunityIds, opportunities]);

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">My Activities</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Monitor registrations and past participations</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 max-w-sm">
          {(['registered', 'saved', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 capitalize transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activity Table/List */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-slate-100 rounded-xl"></div>
              ))}
            </div>
          ) : list.length === 0 ? (
            /* Empty State */
            <div className="p-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">No activities logged yet</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Join hackathons, apply for internships, or sign up for volunteering drives to populate this ledger.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/explore">
                  <button className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow">
                    Find Opportunities
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 border-b border-slate-100 uppercase tracking-wider font-bold text-[10px]">
                    <th className="py-4 px-6">Opportunity</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                  {list.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4.5 px-6">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{opp.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{opp.host}</p>
                        </div>
                      </td>
                      <td className="py-4.5 px-6">
                        <Badge variant="secondary">{opp.category}</Badge>
                      </td>
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{opp.date}</span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className="flex items-center gap-1.5">
                          {activeTab === 'registered' ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                              <span className="text-indigo-700">Registered</span>
                            </>
                          ) : activeTab === 'completed' ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                              <span className="text-emerald-700">Completed</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                              <span className="text-slate-600">Saved</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <Link 
                          href={`/opportunities/${opp.id}`}
                          className="inline-flex items-center justify-center font-bold text-[10px] bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
