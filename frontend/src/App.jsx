import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PredictionProvider } from './context/PredictionProvider';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Predict } from './pages/Predict';

function App() {
  return (
    <ThemeProvider>
      <PredictionProvider>
        <MainApp />
      </PredictionProvider>
    </ThemeProvider>
  );
}

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="flex-1">
          {currentPage === 'home' ? (
            <Home onNavigate={setCurrentPage} />
          ) : (
            <Predict onNavigate={setCurrentPage} />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;