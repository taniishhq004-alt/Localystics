'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { DashboardShell } from '@/components/DashboardShell';
import { OpportunityCard } from '@/components/OpportunityCard';
import { OpportunityService, calculateDistance } from '@/services/opportunities';
import { Opportunity } from '@/data/mockOpportunities';
import { GridSkeleton } from '@/components/Skeletons';
import { Search, SlidersHorizontal, ArrowUpDown, X, MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/Button';

export default function ExplorePage() {
  const { userProfile, opportunities } = useApp();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Opportunity[]>([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedMode, setSelectedMode] = useState<'All' | 'Online' | 'Offline'>('All');
  const [selectedPrice, setSelectedPrice] = useState<'All' | 'Free' | 'Paid'>('All');
  const [selectedDistance, setSelectedDistance] = useState<number>(50); // max 50km
  const [sortBy, setSortBy] = useState('relevant'); // relevant, nearest, latest, deadline, popular
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = ['All', 'Hackathons', 'Internships', 'Workshops', 'Meetups', 'Competitions', 'Volunteering', 'Conferences', 'Networking'];
  const cities = ['All', 'Delhi', 'Noida', 'Greater Noida', 'Gurugram', 'Ghaziabad'];

  const loadFilteredOpportunities = async () => {
    setLoading(true);
    try {
      const filters = {
        category: selectedCategory,
        city: selectedCity,
        mode: selectedMode,
        price: selectedPrice,
        distance: selectedDistance === 50 ? undefined : selectedDistance,
        searchQuery: searchQuery,
        userLat: userProfile?.latitude,
        userLng: userProfile?.longitude,
      };

      // Query mock service layer
      let data = await OpportunityService.getOpportunities(filters);

      // Sort data
      if (sortBy === 'nearest' && userProfile) {
        data = data.sort((a, b) => {
          if (a.mode === 'Online') return 1;
          if (b.mode === 'Online') return -1;
          const distA = calculateDistance(userProfile.latitude, userProfile.longitude, a.latitude, a.longitude);
          const distB = calculateDistance(userProfile.latitude, userProfile.longitude, b.latitude, b.longitude);
          return distA - distB;
        });
      } else if (sortBy === 'latest') {
        // Mock latest (sort by ID or name)
        data = data.sort((a, b) => b.id.localeCompare(a.id));
      } else if (sortBy === 'deadline') {
        data = data.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      } else if (sortBy === 'popular') {
        data = data.sort((a, b) => b.matchScore - a.matchScore); // Mock popularity by high match
      } else {
        // relevant: sort by matchScore desc
        data = data.sort((a, b) => b.matchScore - a.matchScore);
      }

      setResults(data);
    } catch (err) {
      console.error('Failed to load explore data', err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search on filter/search change
  useEffect(() => {
    loadFilteredOpportunities();
  }, [selectedCategory, selectedCity, selectedMode, selectedPrice, selectedDistance, sortBy, searchQuery, opportunities]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCity('All');
    setSelectedMode('All');
    setSelectedPrice('All');
    setSelectedDistance(50);
    setSortBy('relevant');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCity !== 'All' ? 1 : 0) +
    (selectedMode !== 'All' ? 1 : 0) +
    (selectedPrice !== 'All' ? 1 : 0) +
    (selectedDistance !== 50 ? 1 : 0) +
    (searchQuery !== '' ? 1 : 0);

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Explore Opportunities</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Search and filter hyperlocal technical events</p>
        </div>

        {/* Search & Sort Panel */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-slate-100 p-4.5 rounded-2xl shadow-sm">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              placeholder="Search hackathons, internships, workshops (e.g. AI, React)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-150 focus:border-indigo-500 hover:border-slate-200 focus:bg-white pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all text-slate-800"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Filter Toggle */}
            <Button
              variant={showAdvancedFilters ? 'secondary' : 'outline'}
              className="flex-1 md:flex-initial text-xs font-bold font-sans"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 md:flex-initial flex items-center bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none pr-1.5 cursor-pointer text-slate-700 font-bold"
              >
                <option value="relevant">Most Relevant</option>
                <option value="nearest">Nearest Me</option>
                <option value="latest">Latest Created</option>
                <option value="deadline">Deadline Soon</option>
                <option value="popular">Popular matches</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-up text-xs font-semibold text-slate-600">
            {/* City Filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">City / Subregion</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-indigo-500 text-slate-800 font-medium"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Travel Distance Filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Max Proximity Radius: {selectedDistance === 50 ? 'Anywhere' : `${selectedDistance} km`}
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 py-2.5"
              />
            </div>

            {/* Mode Filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Participation Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-indigo-500 text-slate-800 font-medium"
              >
                <option value="All">Online & Offline</option>
                <option value="Online">Online Only</option>
                <option value="Offline">Offline Only</option>
              </select>
            </div>

            {/* Pricing Filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Registration Price</label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none focus:border-indigo-500 text-slate-800 font-medium"
              >
                <option value="All">Free & Paid</option>
                <option value="Free">Free Only</option>
                <option value="Paid">Paid Only</option>
              </select>
            </div>
          </div>
        )}

        {/* Category Chips Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold border rounded-xl flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white border-slate-150 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider mr-1">Active filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-150 font-bold">
                <span>Query: &quot;{searchQuery}&quot;</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-indigo-900"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-150 font-bold">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('All')} className="hover:text-indigo-900"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}

            {selectedCity !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-150 font-bold">
                <span>City: {selectedCity}</span>
                <button onClick={() => setSelectedCity('All')} className="hover:text-indigo-900"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}

            {selectedMode !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-150 font-bold">
                <span>Mode: {selectedMode}</span>
                <button onClick={() => setSelectedMode('All')} className="hover:text-indigo-900"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}

            {selectedPrice !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-150 font-bold">
                <span>Price: {selectedPrice}</span>
                <button onClick={() => setSelectedPrice('All')} className="hover:text-indigo-900"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}

            {selectedDistance !== 50 && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-150 font-bold">
                <span>Radius: &lt;= {selectedDistance} km</span>
                <button onClick={() => setSelectedDistance(50)} className="hover:text-indigo-900"><X className="w-3.5 h-3.5" /></button>
              </span>
            )}

            <button
              onClick={handleClearFilters}
              className="text-xs text-rose-500 hover:text-rose-600 font-bold ml-1.5"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-4.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Search Results {!loading && `(${results.length} found)`}
            </span>
          </div>

          {loading ? (
            <GridSkeleton count={6} />
          ) : results.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-slate-100 p-16 text-center rounded-3xl shadow-sm space-y-4 max-w-lg mx-auto mt-6">
              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">No results match your filters</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Try widening your maximum travel radius, toggling online events, or using more general search keywords.
                </p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={handleClearFilters} className="font-bold text-xs">
                  Reset Search Criteria
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
