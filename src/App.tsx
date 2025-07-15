import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useOrientation } from './hooks/useOrientation';
import RotationPrompt from './components/RotationPrompt';
import Navbar from './components/Navbar';
import AboutMe from './pages/AboutMe';
import Experience from './pages/Experience';
import MyApp from './pages/MyApp';
import Contact from './pages/Contact';
import './App.css';
import { useEffect, useState } from 'react';







function App() {
  const orientation = useOrientation();
  const [showRotationPrompt, setShowRotationPrompt] = useState(false);

  // Show prompt for mobile portrait users
  useEffect(() => {
    if (orientation.isMobile && orientation.isPortrait) {
      setShowRotationPrompt(true);
    } else {
      setShowRotationPrompt(false);
    }
  }, [orientation]);

  return (
    <Router>
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
    </Router>
  );
}


export default App;