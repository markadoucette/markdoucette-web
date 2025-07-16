// App.tsx
import { Routes, Route } from 'react-router-dom';
import { useOrientation } from './hooks/useOrientation';
import RotationPrompt from './components/RotationPrompt';
import ScrollToTop from './components/ScrollToTop'; 
import Navbar from './components/Navbar';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';
import SmartTicketAnalyzer from './pages/SmartTicketAnalyzer';
import Contact from './pages/Contact';
import './App.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView, isGALoaded } from './utils/analytics';

function App() {
  const location = useLocation();
  const orientation = useOrientation();
  const [showRotationPrompt, setShowRotationPrompt] = useState(false);
  const [gaInitialized, setGaInitialized] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    
    // Check if GA is loaded with a slight delay
    const checkGA = () => {
      if (isGALoaded()) {
        setGaInitialized(true);
        // Track initial page view
        trackPageView(location.pathname);
      } else {
        // Retry after a short delay
        setTimeout(checkGA, 100);
      }
    };
    
    setTimeout(checkGA, 500); // Give script time to load
  }, []);

  useEffect(() => {
    // Track page changes only after GA is initialized
    if (gaInitialized) {
      trackPageView(location.pathname);
    }
  }, [location, gaInitialized]);

  // Show prompt for mobile portrait users
  useEffect(() => {
    if (orientation.isMobile && orientation.isPortrait) {
      setShowRotationPrompt(true);
    } else {
      setShowRotationPrompt(false);
    }
  }, [orientation]);

  return (
    <div className="min-h-screen bg-gradient-medium">
       <ScrollToTop />
      {/* Rotation Prompt Overlay */}
      <RotationPrompt 
        show={showRotationPrompt} 
        onDismiss={() => setShowRotationPrompt(false)}
      />
      
      {/* Your existing app content */}
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/smart-ticket" element={<SmartTicketAnalyzer />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;