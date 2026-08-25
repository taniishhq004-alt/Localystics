'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Opportunity } from '@/data/mockOpportunities';
import { OpportunityService } from '@/services/opportunities';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { 
  PlusSquare, 
  Layers, 
  Users, 
  Eye, 
  Bookmark, 
  ChevronRight, 
  Calendar, 
  Edit, 
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function HostDashboardPage() {
  const { userProfile, opportunities, deleteOpportunity } = useApp();
  const [hostOpps, setHostOpps] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Compile host analytics dynamically from opportunities state
  const hostName = userProfile?.name || 'NCR Tech Labs';

  useEffect(() => {
    async function loadHostData() {
      setLoading(true);
      const data = await OpportunityService.getHostOpportunities(hostName, opportunities);
      setHostOpps(data);
      setLoading(false);
    }
    loadHostData();
  }, [hostName, opportunities]);

  // Aggregate stats
  const totalPublished = hostOpps.length;
  const totalPending = 0; // Mock pending
  
  // Calculate mock registration details
  const totalRegistrations = hostOpps.reduce((sum, opp) => {
    // Generate mock registrations count based on match score
    return sum + (opp.matchScore * 2);
  }, 0);

  const totalViews = hostOpps.reduce((sum, opp) => {
    return sum + (opp.matchScore * 25);
  }, 0);

  const totalSaves = hostOpps.reduce((sum, opp) => {
    return sum + Math.floor(opp.matchScore / 2);
  }, 0);

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'success';
      case 'pending': return 'warning';
      case 'closed': return 'danger';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-none">
            {userProfile?.college || 'Organizer Dashboard'}
          </h1>
          <p className="text-xs text-slate-400 mt-2 font-bold uppercase tracking-wider">
            Manage your published opportunities and inspect registrant metrics
          </p>
        </div>
        <Link href="/host/opportunities/create">
          <Button size="sm" className="font-bold text-xs shadow-md shadow-indigo-600/10" leftIcon={<PlusSquare className="w-4 h-4" />}>
            Create Opportunity
          </Button>
        </Link>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-500 font-semibold text-xs">
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="uppercase text-[9px] font-bold text-slate-400 tracking-wider">Published</span>
            <Layers className="w-4.5 h-4.5 text-indigo-600 bg-indigo-50 p-0.5 rounded" />
          </div>
          <p className="text-2xl font-black text-slate-950">{totalPublished}</p>
          <p className="text-[10px] text-slate-400">Live NCR opportunities</p>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="uppercase text-[9px] font-bold text-slate-400 tracking-wider">Registrations</span>
            <Users className="w-4.5 h-4.5 text-emerald-600 bg-emerald-50 p-0.5 rounded" />
          </div>
          <p className="text-2xl font-black text-slate-950">{totalRegistrations}</p>
          <p className="text-[10px] text-slate-400">Total student applications</p>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="uppercase text-[9px] font-bold text-slate-400 tracking-wider">Total Views</span>
            <Eye className="w-4.5 h-4.5 text-sky-600 bg-sky-50 p-0.5 rounded" />
          </div>
          <p className="text-2xl font-black text-slate-950">{totalViews}</p>
          <p className="text-[10px] text-slate-400">Impression clicks in feed</p>
        </div>

        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="uppercase text-[9px] font-bold text-slate-400 tracking-wider">Bookmarked</span>
            <Bookmark className="w-4.5 h-4.5 text-amber-600 bg-amber-50 p-0.5 rounded" />
          </div>
          <p className="text-2xl font-black text-slate-950">{totalSaves}</p>
          <p className="text-[10px] text-slate-400">Saves in student boards</p>
        </div>
      </div>

      {/* Recent Opportunities */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-950">Active Opportunity Catalog</h2>
          <Link href="/host/opportunities" className="text-xs text-indigo-600 hover:underline font-bold flex items-center gap-0.5">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-50 rounded-xl"></div>
            ))}
          </div>
        ) : hostOpps.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
              <AlertCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">No opportunities published yet</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Click the Create Opportunity button to start publishing hackathons, meetups, or workshops in the Delhi NCR feed.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-100 uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-4 px-6">Opportunity Details</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Views</th>
                  <th className="py-4 px-6">Joined</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                {hostOpps.slice(0, 5).map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4.5 px-6">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{opp.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{opp.date} • {opp.location}</span>
                        </p>
                      </div>
                    </td>
                    <td className="py-4.5 px-6">
                      <Badge variant={getStatusVariant(opp.status)}>{opp.status}</Badge>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className="font-bold text-slate-950">{opp.matchScore * 25}</span>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className="font-bold text-slate-950">{opp.matchScore * 2}</span>
                    </td>
                    <td className="py-4.5 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link href={`/host/opportunities/${opp.id}/edit`}>
                          <button className="p-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 rounded-xl text-slate-600 shadow-sm transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => deleteOpportunity(opp.id)}
                          className="p-2 border border-slate-200 hover:border-rose-350 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 shadow-sm transition-colors"
                          title="Delete event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
