'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, MapPin, Calendar, Building, ExternalLink, Sparkles } from 'lucide-react';
import { Opportunity } from '../data/mockOpportunities';
import { useApp } from '../context/AppContext';
import { MatchScore } from './MatchScore';
import { DeadlineBadge } from './DeadlineBadge';
import { Badge } from './Badge';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { savedOpportunityIds, toggleSaveOpportunity, userProfile } = useApp();
  const isSaved = savedOpportunityIds.includes(opportunity.id);

  // Parse location info
  const displayLocation = opportunity.mode === 'Online' ? 'Virtual / Online' : opportunity.location;

  // Calculate distance if offline and user location is known
  let distanceText = '';
  if (opportunity.mode === 'Offline' && userProfile) {
    // Standard mock distance or computed from user profile lat/long if we want
    // Let's use a nice dynamic text:
    const baseDistance = opportunity.city.toLowerCase() === userProfile.location.toLowerCase() 
      ? Math.floor(Math.random() * 5) + 1.2 
      : Math.floor(Math.random() * 25) + 10;
    distanceText = `${baseDistance.toFixed(1)} km away`;
  }

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveOpportunity(opportunity.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between h-full">
      {/* Top Details & Match Score Banner */}
      <div className="p-5 flex-grow">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={opportunity.category === 'Hackathons' ? 'primary' : opportunity.category === 'Internships' ? 'success' : 'secondary'}>
              {opportunity.category}
            </Badge>
            {opportunity.mode === 'Online' && (
              <Badge variant="info">Online</Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <MatchScore 
              score={opportunity.matchScore} 
              reasons={opportunity.matchReasons}
              category={opportunity.category}
              title={opportunity.title}
            />
            <button
              onClick={handleSaveToggle}
              className={`p-1.5 rounded-xl border transition-all duration-200 ${
                isSaved 
                  ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100' 
                  : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600 hover:border-slate-200'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save opportunity'}
            >
              <Bookmark className={`w-4.5 h-4.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/opportunities/${opportunity.id}`} className="block">
          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors mb-1.5">
            {opportunity.title}
          </h3>
        </Link>

        {/* Host Name */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Building className="w-3.5 h-3.5" />
          <span className="font-semibold">{opportunity.host}</span>
          {opportunity.source === 'EXTERNAL' && (
            <span className="inline-flex items-center text-slate-400 font-normal">
              via {opportunity.sourceName}
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </span>
          )}
        </div>

        {/* Metadata Details Grid */}
        <div className="space-y-2 mb-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{opportunity.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">
              {displayLocation}
              {distanceText && <span className="text-slate-400 font-medium"> • {distanceText}</span>}
            </span>
          </div>
        </div>

        {/* Skills Tag List */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {opportunity.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-md">
              {skill}
            </span>
          ))}
          {opportunity.skills.length > 3 && (
            <span className="text-[10px] font-semibold text-slate-400 px-1 py-0.5">
              +{opportunity.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-3">
        <DeadlineBadge deadlineISO={opportunity.deadline} />
        
        <Link 
          href={`/opportunities/${opportunity.id}`}
          className="inline-flex items-center justify-center font-bold text-xs bg-white text-indigo-600 border border-slate-200 hover:border-indigo-100 hover:bg-indigo-50/30 px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow"
        >
          View Opportunity
        </Link>
      </div>
    </div>
  );
}
