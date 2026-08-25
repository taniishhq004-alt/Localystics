'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockOpportunities, Opportunity } from '../data/mockOpportunities';

export interface UserProfile {
  name: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  interests: string[];
  skills: string[];
  location: string;
  latitude: number;
  longitude: number;
  distancePreference: number; // in km
  role: 'Student' | 'Host';
}

export interface NotificationItem {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

export interface AppContextType {
  role: 'Student' | 'Host';
  setRole: (role: 'Student' | 'Host') => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  isOnboarded: boolean;
  setIsOnboarded: (status: boolean) => void;
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  savedOpportunityIds: string[];
  toggleSaveOpportunity: (id: string) => void;
  registeredOpportunityIds: string[];
  registerForOpportunity: (id: string) => void;
  completedOpportunityIds: string[];
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'matchScore' | 'matchReasons' | 'status'>) => string;
  updateOpportunity: (id: string, opp: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  logout: () => void;
}

const defaultProfile: UserProfile = {
  name: 'Ayaan',
  college: 'Example Institute of Technology',
  degree: 'B.Tech',
  branch: 'Computer Science & Engineering',
  year: '2nd Year',
  interests: ['Artificial Intelligence', 'Web Development', 'Hackathons'],
  skills: ['Python', 'React', 'Machine Learning'],
  location: 'Delhi',
  latitude: 28.6139,
  longitude: 77.2090,
  distancePreference: 10,
  role: 'Student',
};

const defaultNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    message: 'Your saved AI Hackathon 2026 closes in 2 days. Complete your registration!',
    timestamp: '2 hours ago',
    read: false,
    type: 'warning',
  },
  {
    id: 'notif-2',
    message: '3 new hackathons and internships match your interest in Web Development.',
    timestamp: '5 hours ago',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-3',
    message: 'React Developers Meetup - NCR Edition is happening 3.2 km from your location this weekend.',
    timestamp: '1 day ago',
    read: true,
    type: 'info',
  },
  {
    id: 'notif-4',
    message: 'Registration successful for React Developers Meetup - NCR Edition.',
    timestamp: '1 day ago',
    read: true,
    type: 'success',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<'Student' | 'Host'>('Student');
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboardedState] = useState<boolean>(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp-1', 'opp-6']);
  const [registeredOpportunityIds, setRegisteredOpportunityIds] = useState<string[]>(['opp-18']);
  const [completedOpportunityIds] = useState<string[]>(['opp-3']);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Load initial state on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('localystic_role');
      const storedProfile = localStorage.getItem('localystic_profile');
      const storedOnboarded = localStorage.getItem('localystic_onboarded');
      const storedOpps = localStorage.getItem('localystic_opportunities');
      const storedSaved = localStorage.getItem('localystic_saved');
      const storedRegistered = localStorage.getItem('localystic_registered');
      const storedNotifs = localStorage.getItem('localystic_notifications');

      setRoleState((storedRole as 'Student' | 'Host') || 'Student');
      setUserProfileState(storedProfile ? JSON.parse(storedProfile) : defaultProfile);
      setIsOnboardedState(storedOnboarded ? JSON.parse(storedOnboarded) : true);
      setOpportunities(storedOpps ? JSON.parse(storedOpps) : mockOpportunities);
      setSavedOpportunityIds(storedSaved ? JSON.parse(storedSaved) : ['opp-1', 'opp-6']);
      setRegisteredOpportunityIds(storedRegistered ? JSON.parse(storedRegistered) : ['opp-18']);
      setNotifications(storedNotifs ? JSON.parse(storedNotifs) : defaultNotifications);
    }
  }, []);

  const setRole = (newRole: 'Student' | 'Host') => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('localystic_role', newRole);
    }
  };

  const setUserProfile = (profile: UserProfile | null) => {
    setUserProfileState(profile);
    if (typeof window !== 'undefined') {
      if (profile) {
        localStorage.setItem('localystic_profile', JSON.stringify(profile));
      } else {
        localStorage.removeItem('localystic_profile');
      }
    }
  };

  const setIsOnboarded = (status: boolean) => {
    setIsOnboardedState(status);
    if (typeof window !== 'undefined') {
      localStorage.setItem('localystic_onboarded', JSON.stringify(status));
    }
  };

  const syncOpportunities = (newOpps: Opportunity[]) => {
    setOpportunities(newOpps);
    if (typeof window !== 'undefined') {
      localStorage.setItem('localystic_opportunities', JSON.stringify(newOpps));
    }
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds((prev) => {
      const isAlreadySaved = prev.includes(id);
      const updated = isAlreadySaved ? prev.filter((oId) => oId !== id) : [...prev, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('localystic_saved', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const registerForOpportunity = (id: string) => {
    setRegisteredOpportunityIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('localystic_registered', JSON.stringify(updated));
      }

      // Add success notification
      const matchedOpp = opportunities.find((o) => o.id === id);
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        message: `Successfully registered for ${matchedOpp ? matchedOpp.title : 'the opportunity'}!`,
        timestamp: 'Just now',
        read: false,
        type: 'success',
      };
      setNotifications((notifs) => {
        const nextNotifs = [newNotif, ...notifs];
        localStorage.setItem('localystic_notifications', JSON.stringify(nextNotifs));
        return nextNotifs;
      });

      return updated;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      if (typeof window !== 'undefined') {
        localStorage.setItem('localystic_notifications', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      if (typeof window !== 'undefined') {
        localStorage.setItem('localystic_notifications', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const addOpportunity = (oppData: Omit<Opportunity, 'id' | 'matchScore' | 'matchReasons' | 'status'>) => {
    const newId = `opp-host-${Date.now()}`;
    const newOpp: Opportunity = {
      ...oppData,
      id: newId,
      matchScore: Math.floor(Math.random() * 25) + 70, // 70 to 95 match
      matchReasons: [
        `Matches your ${oppData.category.slice(0, -1)} preference`,
        `Located in ${oppData.city}`,
        'Fits standard student skillsets',
      ],
      status: 'Published',
    };

    const nextOpps = [newOpp, ...opportunities];
    syncOpportunities(nextOpps);
    return newId;
  };

  const updateOpportunity = (id: string, updatedFields: Partial<Opportunity>) => {
    const nextOpps = opportunities.map((opp) => (opp.id === id ? { ...opp, ...updatedFields } : opp));
    syncOpportunities(nextOpps);
  };

  const deleteOpportunity = (id: string) => {
    const nextOpps = opportunities.filter((opp) => opp.id !== id);
    syncOpportunities(nextOpps);
  };

  const logout = () => {
    setUserProfileState(null);
    setIsOnboardedState(false);
    setRoleState('Student');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('localystic_role');
      localStorage.removeItem('localystic_profile');
      localStorage.removeItem('localystic_onboarded');
      localStorage.removeItem('localystic_saved');
      localStorage.removeItem('localystic_registered');
      localStorage.removeItem('localystic_notifications');
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        userProfile,
        setUserProfile,
        isOnboarded,
        setIsOnboarded,
        opportunities,
        setOpportunities,
        savedOpportunityIds,
        toggleSaveOpportunity,
        registeredOpportunityIds,
        registerForOpportunity,
        completedOpportunityIds,
        notifications,
        markNotificationRead,
        markAllNotificationsAsRead,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
