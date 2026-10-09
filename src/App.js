
import './App.css';

import { useCallback, useState } from 'react';
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

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="birthday-app">
      <Butterflies />
      <Sunflowers/>

      {isloading && (
        <LoadingScreen onComplete={finishLoading} />
      )}

      <nav className="navbar">
        <a href="#home" className="brand">
          little sunshine <span>☀️</span>
        </a>

        <div className="nav-links">
          <a href="#food-adventures">FoodAdventures 🍕</a>
          <a href="#memories">Memories 📸</a>
          <a href="#food-games">Play our games 🎮</a>
          <a href="#letter">Birthday letter 💌</a>
        </div>
      </nav>

      <Hero />
      <FoodAdventures />
      <Memories />
      <BirthdayLetter />
      <FoodGames />

      <footer className="footer">
        <p>Made with 💛, memories, and a little bit of code.</p>
        <p>For someone who makes life brighter. ♡</p>
      </footer>
    </div>
  );
}

export default App;
