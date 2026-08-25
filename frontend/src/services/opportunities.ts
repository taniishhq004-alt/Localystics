import { mockOpportunities, Opportunity } from '../data/mockOpportunities';

// Haversine formula to calculate distance between two coordinates in km
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(1));
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface OpportunityFilters {
  category?: string;
  city?: string;
  distance?: number; // max distance in km
  mode?: 'Online' | 'Offline' | 'All';
  price?: 'Free' | 'Paid' | 'All';
  searchQuery?: string;
  userLat?: number;
  userLng?: number;
}

export const OpportunityService = {
  // GET /api/opportunities
  async getOpportunities(filters: OpportunityFilters = {}): Promise<Opportunity[]> {
    await delay(300);
    let results = [...mockOpportunities];

    if (filters.category && filters.category !== 'All') {
      results = results.filter((o) => o.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.city && filters.city !== 'All') {
      results = results.filter((o) => o.city.toLowerCase() === filters.city!.toLowerCase());
    }

    if (filters.mode && filters.mode !== 'All') {
      results = results.filter((o) => o.mode === filters.mode);
    }

    if (filters.price && filters.price !== 'All') {
      if (filters.price === 'Free') {
        results = results.filter((o) => o.price.toLowerCase() === 'free');
      } else {
        results = results.filter((o) => o.price.toLowerCase() !== 'free');
      }
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.host.toLowerCase().includes(q) ||
          o.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Distance filter (requires user coordinates)
    if (filters.distance && filters.userLat !== undefined && filters.userLng !== undefined) {
      results = results.filter((o) => {
        // Online events are treated as "Anywhere" or distance = 0
        if (o.mode === 'Online') return true;
        const dist = calculateDistance(filters.userLat!, filters.userLng!, o.latitude, o.longitude);
        return dist <= filters.distance!;
      });
    }

    return results;
  },

  // GET /api/opportunities/{id}
  async getOpportunityById(id: string): Promise<Opportunity | null> {
    await delay(150);
    const opp = mockOpportunities.find((o) => o.id === id);
    return opp || null;
  },

  // GET /api/opportunities/nearby
  async getNearbyOpportunities(
    lat: number,
    lng: number,
    radiusKm: number,
    opportunitiesList: Opportunity[] = mockOpportunities
  ): Promise<(Opportunity & { calculatedDistance: number })[]> {
    await delay(250);
    return opportunitiesList
      .map((opp) => ({
        ...opp,
        calculatedDistance: calculateDistance(lat, lng, opp.latitude, opp.longitude),
      }))
      .filter((opp) => opp.mode === 'Online' || opp.calculatedDistance <= radiusKm)
      .sort((a, b) => a.calculatedDistance - b.calculatedDistance);
  },

  // GET /api/opportunities/recommended
  async getRecommendations(
    userPreferences: {
      interests: string[];
      skills: string[];
      location: string;
      latitude: number;
      longitude: number;
      distancePreference: number;
    },
    opportunitiesList: Opportunity[] = mockOpportunities
  ): Promise<Opportunity[]> {
    await delay(400);

    return opportunitiesList
      .map((opp) => {
        // Dynamic scoring calculation simulating ML backend recommender
        let score = 50; // Base score
        const matchReasons: string[] = [];

        // Interest overlap
        const interestOverlap = opp.skills.filter((skill) =>
          userPreferences.interests.some((interest) =>
            interest.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(interest.toLowerCase())
          )
        );
        if (interestOverlap.length > 0) {
          score += 20;
          matchReasons.push(`Matches your interests: ${interestOverlap.slice(0, 2).join(', ')}`);
        }

        // Skill overlap
        const skillOverlap = opp.skills.filter((skill) =>
          userPreferences.skills.some((userSkill) =>
            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(userSkill.toLowerCase())
          )
        );
        if (skillOverlap.length > 0) {
          score += 15;
          matchReasons.push(`Requires your skills: ${skillOverlap.slice(0, 2).join(', ')}`);
        }

        // Distance matching
        if (opp.mode === 'Online') {
          score += 10;
          matchReasons.push('Online mode offers maximum flexibility');
        } else {
          const distance = calculateDistance(
            userPreferences.latitude,
            userPreferences.longitude,
            opp.latitude,
            opp.longitude
          );
          if (distance <= userPreferences.distancePreference) {
            score += 15;
            matchReasons.push(`Hyperlocal: Only ${distance} km from your location`);
          } else if (distance <= 25) {
            score += 5;
            matchReasons.push(`Within driving range (${distance} km)`);
          }
        }

        // Category/Deadline matching
        const daysLeft = Math.ceil(
          (new Date(opp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
        if (daysLeft > 0 && daysLeft <= 3) {
          score += 10;
          matchReasons.push(`Closes soon: Only ${daysLeft} days left to register`);
        }

        return {
          ...opp,
          matchScore: Math.min(score, 99),
          matchReasons: matchReasons.length > 0 ? matchReasons : ['Selected based on trending opportunities in your area'],
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  },

  // GET /api/hosts/opportunities
  async getHostOpportunities(hostName: string, opportunitiesList: Opportunity[] = mockOpportunities): Promise<Opportunity[]> {
    await delay(200);
    return opportunitiesList.filter((o) => o.host.toLowerCase() === hostName.toLowerCase());
  },
};
