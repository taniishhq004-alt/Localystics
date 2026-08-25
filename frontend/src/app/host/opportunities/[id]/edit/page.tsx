'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/Button';
import { 
  ArrowLeft, 
  Save, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Wrench, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export default function EditOpportunityPage() {
  const router = useRouter();
  const params = useParams();
  const { opportunities, updateOpportunity } = useApp();

  const id = params?.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Hackathons' | 'Internships' | 'Workshops' | 'Meetups' | 'Competitions' | 'Volunteering' | 'Conferences' | 'Networking' | 'College Events'>('Hackathons');
  
  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  
  const [mode, setMode] = useState<'Online' | 'Offline'>('Offline');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Noida');
  const [lat, setLat] = useState('28.6219');
  const [lng, setLng] = useState('77.3794');
  
  const [eligibility, setEligibility] = useState('');
  const [skills, setSkills] = useState('');
  const [price, setPrice] = useState('Free');
  const [registrationUrl, setRegistrationUrl] = useState('');

  // Load existing data
  useEffect(() => {
    if (!id || opportunities.length === 0) return;
    const opp = opportunities.find((o) => o.id === id);
    if (opp) {
      setTitle(opp.title);
      setDescription(opp.description);
      setCategory(opp.category);
      setDate(opp.date);
      
      // Parse ISO deadline back to date input string (YYYY-MM-DD)
      try {
        const d = new Date(opp.deadline);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        setDeadline(`${yyyy}-${mm}-${dd}`);
      } catch (e) {
        setDeadline('');
      }

      setMode(opp.mode);
      if (opp.mode === 'Offline') {
        setAddress(opp.location);
        setCity(opp.city);
        setLat(String(opp.latitude));
        setLng(String(opp.longitude));
      } else {
        setAddress('');
      }

      setEligibility(opp.eligibility);
      setSkills(opp.skills.join(', '));
      setPrice(opp.price);
      setRegistrationUrl(opp.registrationUrl);
    }
  }, [id, opportunities]);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const coords: Record<string, { lat: string; lng: string }> = {
      'Delhi': { lat: '28.6139', lng: '77.2090' },
      'Noida': { lat: '28.5355', lng: '77.3910' },
      'Greater Noida': { lat: '28.4744', lng: '77.5030' },
      'Gurugram': { lat: '28.4595', lng: '77.0266' },
      'Ghaziabad': { lat: '28.6692', lng: '77.4538' }
    };
    if (coords[newCity]) {
      setLat(coords[newCity].lat);
      setLng(coords[newCity].lng);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!title || !description || !date || !deadline || (mode === 'Offline' && !address)) {
      setError('Please fill in all required fields marked with *');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const parsedSkills = skills.split(',').map((s) => s.trim()).filter((s) => s !== '');
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      updateOpportunity(id, {
        title,
        description,
        category,
        date,
        deadline: new Date(deadline).toISOString(),
        location: mode === 'Online' ? 'Virtual / Online' : address,
        city,
        latitude: isNaN(latNum) ? 28.6139 : latNum,
        longitude: isNaN(lngNum) ? 77.2090 : lngNum,
        skills: parsedSkills.length > 0 ? parsedSkills : ['Python', 'React'],
        eligibility,
        price,
        mode,
        registrationUrl,
      });

      router.push('/host');
    } catch (err) {
      setError('Failed to update opportunity. Check details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Host Catalog</span>
      </button>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">Edit Opportunity</h1>
        <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">Modify specifications of your published event</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs text-slate-600 font-semibold">
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-2 font-bold">
            <Info className="w-4.5 h-4.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Basic Info */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2 text-sm">
            <Layers className="w-4.5 h-4.5 text-indigo-500" />
            <span>Basic Information</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Opportunity Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Delhi NCR Hackathon 2026"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium bg-white"
                >
                  <option value="Hackathons">Hackathons</option>
                  <option value="Internships">Internships</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Meetups">Meetups</option>
                  <option value="Competitions">Competitions</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Conferences">Conferences</option>
                  <option value="Networking">Networking</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Registration Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Free or ₹500"
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Description *</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event agenda, rewards, structure, and dates..."
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium text-xs leading-normal"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Dates */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2 text-sm">
            <Calendar className="w-4.5 h-4.5 text-indigo-500" />
            <span>Dates & Timeline</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Event Date (Display text) *</label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="September 12, 2026"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Registration Deadline (Calendar Date) *</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Location */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2 text-sm">
            <MapPin className="w-4.5 h-4.5 text-indigo-500" />
            <span>Participation Mode & Location</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mode</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setMode('Offline')}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-bold transition-all text-center ${
                    mode === 'Offline'
                      ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700'
                      : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Offline Venue (NCR Map)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('Online')}
                  className={`flex-1 py-2.5 rounded-xl border-2 font-bold transition-all text-center ${
                    mode === 'Online'
                      ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700'
                      : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  Online / Virtual
                </button>
              </div>
            </div>

            {mode === 'Offline' && (
              <div className="space-y-4 animate-scale-up">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target City</label>
                    <select
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium bg-white"
                    >
                      <option>Delhi</option>
                      <option>Noida</option>
                      <option>Greater Noida</option>
                      <option>Gurugram</option>
                      <option>Ghaziabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Latitude</label>
                    <input
                      type="text"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                      placeholder="28.6139"
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Longitude</label>
                    <input
                      type="text"
                      value={lng}
                      onChange={(e) => setLng(e.target.value)}
                      placeholder="77.2090"
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required={mode === 'Offline'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Connaught Place, Block B, New Delhi"
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Prerequisites */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2 text-sm">
            <Wrench className="w-4.5 h-4.5 text-indigo-500" />
            <span>Eligibility & Skills matching</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Academic Eligibility Requirements</label>
              <input
                type="text"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                placeholder="B.Tech Computer Science, BCA, MCA 2nd and 3rd year students"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Skills (Comma separated)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Python, React, Machine Learning"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">External Registration URL (Optional)</label>
              <input
                type="url"
                value={registrationUrl}
                onChange={(e) => setRegistrationUrl(e.target.value)}
                placeholder="https://unstop.com/your-event-link"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs text-rose-500 hover:text-rose-600 font-bold"
          >
            Cancel changes
          </button>
          
          <Button
            type="submit"
            isLoading={isLoading}
            className="font-bold text-xs py-2.5 px-6 shadow-md shadow-indigo-600/10"
            rightIcon={<Save className="w-4 h-4" />}
          >
            Update Opportunity
          </Button>
        </div>
      </form>
    </div>
  );
}
