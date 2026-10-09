
import './App.css';

import { useCallback, useEffect, useState } from 'react';

import FoodAdventures from './components/food/Food';
import Memories from './components/memories/Memories';
import BirthdayLetter from './components/birthday/Birthday';
import Hero from './components/hero/Hero';
import LoadingScreen from './components/loading/Loading';
import FoodGames from './components/foodgames/FoodGames';
import Butterflies from './components/butterflies/Butterflies';
import Sunflowers from './components/sunflowers/Sunflowers';

function App() {
  const [isloading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(
    Boolean(document.fullscreenElement)
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Keep the fullscreen button label in sync with browser state.
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((previousMode) => !previousMode);
  };

  return (
    <div
      className={`birthday-app ${
        isDarkMode ? 'dark-mode' : 'light-mode'
      }`}
    >
      {/* Floating decorations */}
      <Butterflies />
      <Sunflowers />

      {/* Loading screen */}
      {isloading && (
        <LoadingScreen onComplete={finishLoading} />
      )}

      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="brand">
          little sunshine <span>☀️</span>
        </a>

        <div className="nav-links">
          <a href="#food-adventures">FoodAdventures 🍕</a>
          <a href="#memories">Memories 📸</a>
          <a href="#letter">Birthday letter 💌</a>
          <a href="#food-games">Play our games 🎮</a>
        </div>

        {/* Theme button on the left, fullscreen on the right */}
        <div className="navbar-actions">
          <button
            type="button"
            className="theme-button"
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            type="button"
            className="fullscreen-button"
            onClick={toggleFullscreen}
          >
            {isFullscreen
              ? 'Exit Fullscreen'
              : 'Fullscreen ⛶'}
          </button>
        </div>
      </nav>

      {/* Website sections */}
      <Hero />
      <FoodAdventures />
      <Memories />
      <BirthdayLetter />
      <FoodGames />

      {/* Footer */}
      <footer className="footer">
        <p>Made with 💛, memories, and a little bit of code.</p>
        <p>For someone who makes life brighter. ♡</p>
      </footer>
    </div>
  );
}

export default App;
