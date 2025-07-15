// App.tsx
import { Routes, Route } from 'react-router-dom';
import { useOrientation } from './hooks/useOrientation';
import RotationPrompt from './components/RotationPrompt';
import Navbar from './components/Navbar';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';
import MyApp from './pages/MyApp';
import Contact from './pages/Contact';
import './App.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from './utils/analytics';

function App() {
  const location = useLocation(); // This will now work!
  const orientation = useOrientation();
  const [showRotationPrompt, setShowRotationPrompt] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  useEffect(() => {
    // Track page changes
    trackPageView(location.pathname);
  }, [location]);

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
          <Route path="/app" element={<MyApp />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;