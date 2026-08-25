'use client';

import React, { useEffect, useRef } from 'react';
import { Opportunity } from '../data/mockOpportunities';

interface MapViewProps {
  userLat: number;
  userLng: number;
  radiusKm: number;
  opportunities: Opportunity[];
  onSelectOpportunity?: (opp: Opportunity) => void;
  selectedOpportunityId?: string | null;
}

export default function MapView({
  userLat,
  userLng,
  radiusKm,
  opportunities,
  onSelectOpportunity,
  selectedOpportunityId,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const radiusCircleRef = useRef<any>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Dynamic import of Leaflet on client side
    let L: any;
    
    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      
      // Import Leaflet dynamically
      L = (await import('leaflet')).default;
      
      // If map is already initialized, just update view
      if (!mapInstanceRef.current) {
        // Initialize map
        mapInstanceRef.current = L.map(mapContainerRef.current, {
          zoomControl: false,
        }).setView([userLat, userLng], 13);

        // Add custom Zoom Control to bottom right
        L.control.zoom({
          position: 'bottomright'
        }).addTo(mapInstanceRef.current);

        // Add light, clean tiles (CartoDB Positron is much cleaner than standard OpenStreetMap)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20
        }).addTo(mapInstanceRef.current);
      } else {
        // Recenter map
        mapInstanceRef.current.setView([userLat, userLng], mapInstanceRef.current.getZoom());
      }

      const map = mapInstanceRef.current;

      // Clear previous markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Clear previous radius circle
      if (radiusCircleRef.current) {
        radiusCircleRef.current.remove();
      }

      // Draw Radius Circle (light blue transparent)
      radiusCircleRef.current = L.circle([userLat, userLng], {
        color: '#6366f1', // indigo
        fillColor: '#818cf8',
        fillOpacity: 0.1,
        weight: 1.5,
        radius: radiusKm * 1000, // convert to meters
      }).addTo(map);

      // Create Custom User Location Icon (Pulsing blue dot)
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div class="relative flex items-center justify-center w-6 h-6">
            <div class="absolute w-6 h-6 bg-indigo-500 rounded-full opacity-40 animate-ping"></div>
            <div class="relative w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white shadow-md"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Add User Marker
      const userMarker = L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<b>Your Current Location</b>');
      markersRef.current.push(userMarker);

      // Add Opportunity Markers
      opportunities.forEach((opp) => {
        // Skip online events as they don't have a physical map location
        if (opp.mode === 'Online') return;

        const isSelected = selectedOpportunityId === opp.id;

        // Custom Opportunity Icon containing match score
        const matchColorClass = opp.matchScore >= 90 ? 'bg-emerald-500' : opp.matchScore >= 75 ? 'bg-indigo-500' : 'bg-amber-500';
        const ringClass = isSelected ? 'ring-4 ring-indigo-300 scale-110 z-50' : 'hover:scale-105';

        const oppIcon = L.divIcon({
          className: 'custom-opp-marker',
          html: `
            <div class="flex items-center justify-center shadow-lg border border-white rounded-2xl px-2 py-1 text-white font-bold text-[10px] transition-all ${matchColorClass} ${ringClass}">
              <span>${opp.matchScore}%</span>
            </div>
          `,
          iconSize: [40, 24],
          iconAnchor: [20, 12],
        });

        const marker = L.marker([opp.latitude, opp.longitude], { icon: oppIcon }).addTo(map);

        // Bind custom HTML popup card
        const popupContent = `
          <div class="p-1 font-sans max-w-[200px]">
            <span class="text-[10px] font-bold text-indigo-600 uppercase">${opp.category}</span>
            <h4 class="font-bold text-xs text-slate-900 mt-0.5 leading-tight">${opp.title}</h4>
            <p class="text-[10px] text-slate-500 mt-1">${opp.host}</p>
            <p class="text-[10px] font-semibold text-slate-800 mt-1">${opp.price}</p>
            <a href="/opportunities/${opp.id}" class="inline-block text-[10px] text-white bg-indigo-600 px-2.5 py-1 rounded-md font-bold mt-2 shadow hover:bg-indigo-700 transition-colors">
              Details
            </a>
          </div>
        `;
        marker.bindPopup(popupContent);

        // Bind click event
        marker.on('click', () => {
          if (onSelectOpportunity) {
            onSelectOpportunity(opp);
          }
        });

        markersRef.current.push(marker);

        // If selected, auto-open popup
        if (isSelected) {
          map.setView([opp.latitude, opp.longitude], map.getZoom());
          marker.openPopup();
        }
      });
    }

    initMap();

    // Clean up
    return () => {
      // We don't necessarily want to destroy the map instance immediately to prevent white screens on fast hot reloads,
      // but in production code cleanup is standard:
      // if (mapInstanceRef.current) {
      //   mapInstanceRef.current.remove();
      //   mapInstanceRef.current = null;
      // }
    };
  }, [userLat, userLng, radiusKm, opportunities, selectedOpportunityId]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50">
      {/* Leaflet CSS CDNs is loaded in our app layout.tsx, but this is the map div container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" style={{ minHeight: '300px' }} />
    </div>
  );
}
