'use client';

import React, { useState } from 'react';
import { ShieldCheck, Info, X, Zap, Target, MapPin, GraduationCap } from 'lucide-react';

interface MatchScoreProps {
  score: number;
  reasons?: string[];
  title?: string;
  category?: string;
}

export function MatchScore({ score, reasons = [], title = 'Opportunity', category = '' }: MatchScoreProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic colors based on score
  const getColorClasses = (val: number) => {
    if (val >= 90) return { bg: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-700', fill: 'bg-emerald-600' };
    if (val >= 75) return { bg: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-700', fill: 'bg-indigo-600' };
    return { bg: 'bg-amber-50 border-amber-100', text: 'text-amber-700', fill: 'bg-amber-600' };
  };

  const colors = getColorClasses(score);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95 ${colors.bg} ${colors.text}`}
        title="Click to see why this matches you"
      >
        <Zap className="w-3.5 h-3.5 fill-current" />
        <span>{score}% Match</span>
        <Info className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {/* Explanation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${colors.bg}`}>
                  <Zap className={`w-5 h-5 ${colors.text} fill-current`} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Localystic Match Explainer</h3>
                  <p className="text-xs text-slate-500">{category}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Total Personalized Match Score</span>
                <span className={`text-2xl font-black ${colors.text}`}>{score}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${colors.fill}`} style={{ width: `${score}%` }}></div>
              </div>

              {/* Match Factors breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Matching Parameters</h4>
                
                <div className="space-y-3">
                  {/* Parameter 1: Interests */}
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <Target className="w-4.5 h-4.5 text-indigo-600 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800">Interests Alignment</span>
                      <p className="text-xs text-slate-500 mt-0.5">Opportunity metadata matches your selected core academic and technical fields.</p>
                    </div>
                  </div>

                  {/* Parameter 2: Skills */}
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800">Skills Matching</span>
                      <p className="text-xs text-slate-500 mt-0.5">Requirement tags align with your current technical capabilities.</p>
                    </div>
                  </div>

                  {/* Parameter 3: Geography */}
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <MapPin className="w-4.5 h-4.5 text-rose-600 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-800">Hyperlocal Proximity</span>
                      <p className="text-xs text-slate-500 mt-0.5">Calculated distance fits within your travel preferences.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specific Reasons */}
              {reasons.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Why we recommend this</h4>
                  <ul className="space-y-2">
                    {reasons.map((reason, index) => (
                      <li key={index} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow transition-colors"
              >
                Got it, thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
