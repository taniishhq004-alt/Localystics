'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useApp } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { OpportunityService, calculateDistance } from '@/services/opportunities';
import { Opportunity } from '@/data/mockOpportunities';
import { MapPin, Compass, Navigation, Eye, Map, List, Navigation2 } from 'lucide-react';
import { Badge } from '@/components/Badge';
import Link from 'next/link';

import MapView from '@/components/MapView';

export default function NearMePage() {
  const { userProfile, opportunities } = useApp();
  const [radius, setRadius] = useState<number>(15); // Default 15km
  const [nearbyOpps, setNearbyOpps] = useState<(Opportunity & { calculatedDistance: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOppId, setSelectedOppId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'list'>('split'); // Responsive modes

  useEffect(() => {
    async function loadNearby() {
      if (!userProfile) return;
      setLoading(true);
      
      try {
        const results = await OpportunityService.getNearbyOpportunities(
          userProfile.latitude,
          userProfile.longitude,
          radius,
          opportunities
        );
        setNearbyOpps(results);
      } catch (err) {
        console.error('Failed to load nearby opportunities', err);
      } finally {
        setLoading(false);
      }
    }

    loadNearby();
  }, [radius, userProfile, opportunities]);

  const handleSelectItem = (id: string) => {
    setSelectedOppId(id);
    // If mobile, auto-toggle to map view to show selection
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setViewMode('map');
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-100 p-4.5 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Opportunities Near You</h1>
            <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Geolocate hackathons and meetups surrounding you</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Radius Selector */}
            <div className="flex items-center bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              <span>Radius:</span>
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="bg-transparent border-none outline-none cursor-pointer text-indigo-600 font-bold"
              >
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="15">15 km</option>
                <option value="25">25 km</option>
                <option value="50">50 km</option>
              </select>
            </div>

            {/* Layout Toggle (Mobile friendly) */}
            <div className="flex bg-slate-50 border border-slate-200 p-0.5 rounded-xl text-slate-400 font-bold text-xs lg:hidden">
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg flex items-center gap-1 ${
                  viewMode === 'map' ? 'bg-white text-indigo-600 shadow' : 'hover:text-slate-600'
                }`}
              >
                <Map className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg flex items-center gap-1 ${
                  viewMode === 'list' ? 'bg-white text-indigo-600 shadow' : 'hover:text-slate-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[500px]">
          {/* List Sidebar Pane */}
          <div 
            className={`lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between max-h-[600px] overflow-y-auto ${
              viewMode === 'map' && 'hidden lg:flex'
            }`}
          >
            <div className="space-y-4 flex-grow">
              <div className="border-b border-slate-50 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  List View ({nearbyOpps.length} events)
                </span>
                {userProfile && (
                  <span className="text-[10px] text-slate-500 font-semibold bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-md">
                    Target: {userProfile.location}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-slate-100 rounded-2xl"></div>
                  ))}
                </div>
              ) : nearbyOpps.length === 0 ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">No events in this range</h4>
                    <p className="text-[10px] text-slate-400 leading-normal max-w-xs mx-auto mt-1">
                      No physical events meet your radius boundary. Try expanding the selector to 25 km or 50 km.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {nearbyOpps.map((opp) => {
                    const isSelected = selectedOppId === opp.id;
                    return (
                      <div
                        key={opp.id}
                        onClick={() => handleSelectItem(opp.id)}
                        className={`p-4 border rounded-2xl cursor-pointer text-xs transition-all ${
                          isSelected
                            ? 'bg-indigo-50/20 border-indigo-200 ring-2 ring-indigo-50 shadow-sm'
                            : 'bg-slate-50/40 border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] font-bold uppercase text-indigo-600 tracking-wider">
                            {opp.category}
                          </span>
                          <span className="text-[9px] font-black text-slate-400 flex items-center gap-0.5">
                            <Navigation2 className="w-2.5 h-2.5 fill-current" />
                            {opp.calculatedDistance} km
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 mt-1 leading-snug">{opp.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{opp.host}</p>

                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100/60">
                          <span className="text-[9px] bg-white border border-slate-150 px-2 py-0.5 rounded-md font-bold text-slate-600">
                            {opp.matchScore}% Match
                          </span>
                          <Link 
                            href={`/opportunities/${opp.id}`}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
                          >
                            <span>Details</span>
                            <Compass className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Map Pane (Leaflet Integration) */}
          <div 
            className={`lg:col-span-8 h-[450px] lg:h-auto rounded-3xl overflow-hidden shadow-inner border border-slate-100 relative ${
              viewMode === 'list' && 'hidden lg:block'
            }`}
          >
            {userProfile && (
              <MapView 
                userLat={userProfile.latitude}
                userLng={userProfile.longitude}
                radiusKm={radius}
                opportunities={opportunities}
                selectedOpportunityId={selectedOppId}
                onSelectOpportunity={(opp) => setSelectedOppId(opp.id)}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
