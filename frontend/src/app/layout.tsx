import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata = {
  title: 'LOCALYSTIC - Discover Opportunities That Matter',
  description: 'AI-powered hyperlocal opportunity discovery platform matching student interests, education, skills, and location to hackathons, internships, workshops, and volunteering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet CSS for Map Rendering */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        {/* Google Font Outfit for modern aesthetic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-slate-800 bg-slate-50 min-h-screen" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
