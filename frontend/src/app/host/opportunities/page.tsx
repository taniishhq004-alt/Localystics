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
  Calendar, 
  MapPin, 
  Edit, 
  Trash2, 
  Search, 
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function HostOpportunitiesPage() {
  const { userProfile, opportunities, deleteOpportunity } = useApp();
  const [hostOpps, setHostOpps] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const hostName = userProfile?.name || 'NCR Tech Labs';

  useEffect(() => {
    async function loadHostOpps() {
      setLoading(true);
      const data = await OpportunityService.getHostOpportunities(hostName, opportunities);
      
      // Filter by search query if any
      const filtered = data.filter((opp) => 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setHostOpps(filtered);
      setLoading(false);
    }
    loadHostOpps();
  }, [hostName, opportunities, searchQuery]);

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'success';
      case 'pending': return 'warning';
      case 'closed': return 'danger';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-100 p-4.5 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">My Opportunities</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Inspect and manage your published catalog</p>
        </div>

        <Link href="/host/opportunities/create">
          <Button size="sm" className="font-bold text-xs" leftIcon={<PlusSquare className="w-4 h-4" />}>
            Create Opportunity
          </Button>
        </Link>
      </div>

      {/* Search Input bar */}
      <div className="relative max-w-md w-full bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4.5 h-4.5" />
        </div>
        <input
          type="text"
          placeholder="Search your opportunities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-50 border border-transparent focus:border-indigo-500 hover:border-slate-200 focus:bg-white pl-10 pr-4 py-2 rounded-xl text-xs outline-none transition-colors text-slate-800 font-semibold"
        />
      </div>

      {/* Opportunities list */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-slate-50 rounded-xl"></div>
            ))}
          </div>
        ) : hostOpps.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
              <AlertCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">No opportunities match search criteria</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                If you haven&apos;t published anything yet, click Create Opportunity to start.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 border-b border-slate-100 uppercase tracking-wider font-bold text-[10px]">
                  <th className="py-4 px-6">Opportunity details</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Registrations</th>
                  <th className="py-4 px-6">Saves</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                {hostOpps.map((opp) => (
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
                      <Badge variant="secondary">{opp.category}</Badge>
                    </td>
                    <td className="py-4.5 px-6">
                      <Badge variant={getStatusVariant(opp.status)}>{opp.status}</Badge>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className="font-bold text-slate-950">{opp.matchScore * 2}</span>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className="font-bold text-slate-950">{Math.floor(opp.matchScore / 2)}</span>
                    </td>
                    <td className="py-4.5 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link href={`/host/opportunities/${opp.id}/edit`}>
                          <button className="p-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 rounded-xl text-slate-600 shadow-sm transition-colors">
                            <Edit className="w-4.5 h-4.5" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => deleteOpportunity(opp.id)}
                          className="p-2 border border-slate-200 hover:border-rose-350 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 shadow-sm transition-colors"
                          title="Delete opportunity"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
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
