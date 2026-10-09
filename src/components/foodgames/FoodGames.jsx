
import React, { useEffect, useState } from "react";
import "./FoodGames.css";

const games = [
  {
    id: "dumplings",
    emoji: "🥟",
    name: "Dumpling Dash",
    description: "Catch 8 dumplings before time runs out!",
    color: "dumpling-game",
  },
  {
    id: "pret",
    emoji: "☕",
    name: "Pret Coffee Run",
    description: "Get 5 coffee orders right in a row.",
    color: "pret-game",
  },
  {
    id: "pho",
    emoji: "🍜",
    name: "Pho-nomenal Memory",
    description: "Remember the ingredients in the right order.",
    color: "pho-game",
  },
];

const coffeeOrders = [
  { order: "A strong morning coffee", answer: "Americano", emoji: "☕" },
  { order: "Coffee with plenty of milk", answer: "Latte", emoji: "🥛" },
  { order: "A small, intense coffee", answer: "Espresso", emoji: "☕" },
  { order: "Coffee with a thick milk foam", answer: "Cappuccino", emoji: "🤎" },
  { order: "A chilled coffee for a sunny day", answer: "Iced Coffee", emoji: "🧊" },
];

const phoIngredients = [
  { id: "broth", emoji: "🍲", name: "Broth" },
  { id: "noodles", emoji: "🍜", name: "Rice noodles" },
  { id: "herbs", emoji: "🌿", name: "Fresh herbs" },
  { id: "lime", emoji: "🍋", name: "Lime" },
  { id: "chilli", emoji: "🌶️", name: "Chilli" },
];

function BirthdayWin({ message, onReplay, onHome }) {
  return (
    <div className="game-win">
      <div className="win-stars">✨ 🎉 ✨</div>
      <h3>You did it, sunshine!</h3>
      <p>{message}</p>
      <p className="win-note">
        Every little adventure is better when shared with you. 💛
      </p>
      <div className="game-actions">
        <button className="game-button" onClick={onReplay}>
          Play again ↻
        </button>
        <button className="game-button secondary" onClick={onHome}>
          All games
        </button>
      </div>
    </div>
  );
}

function DumplingDash({ onHome }) {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [status, setStatus] = useState("ready");

  useEffect(() => {
    if (status !== "playing") return;

    if (score >= 8) {
      setStatus("won");
      return;
    }

    if (time <= 0) {
      setStatus("lost");
      return;
    }

    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, score, time]);

  const moveDumpling = () => {
    setScore((s) => s + 1);
    setPosition({
      x: 12 + Math.random() * 76,
      y: 15 + Math.random() * 65,
    });
  };

  const start = () => {
    setScore(0);
    setTime(20);
    setPosition({ x: 50, y: 50 });
    setStatus("playing");
  };

  if (status === "won") {
    return (
      <BirthdayWin
        message="You caught every dumpling! Your next adventure is on us. 🥟"
        onReplay={start}
        onHome={onHome}
      />
    );
  }

  return (
    <div className="mini-game">
      <div className="game-stats">
        <span>🥟 Dumplings: {score}/8</span>
        <span>⏱️ {time}s</span>
      </div>

      {status === "ready" && (
        <div className="game-instructions">
          <span className="big-game-emoji">🥟</span>
          <h3>Ready, hungry explorer?</h3>
          <p>Tap the dumpling as quickly as you can. Catch 8 in 20 seconds!</p>
          <button className="game-button" onClick={start}>
            Start the dash!
          </button>
        </div>
      )}

      {status === "playing" && (
        <div className="dumpling-arena">
          <p className="arena-tip">Catch it before it moves! 👀</p>
          <button
            className="moving-dumpling"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onClick={moveDumpling}
            aria-label="Catch dumpling"
          >
            🥟
          </button>
        </div>
      )}

      {status === "lost" && (
        <div className="game-instructions">
          <span className="big-game-emoji">😋</span>
          <h3>So close!</h3>
          <p>You caught {score} dumplings. Hungry for another try?</p>
          <button className="game-button" onClick={start}>
            Try again ↻
          </button>
        </div>
      )}
    </div>
  );
}

function PretCoffeeRun({ onHome }) {
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("ready");

  const options = ["Americano", "Latte", "Espresso", "Cappuccino", "Iced Coffee"];
  const current = coffeeOrders[round];

  const start = () => {
    setRound(0);
    setCorrect(0);
    setFeedback("");
    setStatus("playing");
  };

  const choose = (drink) => {
    if (drink === current.answer) {
      const newScore = correct + 1;
      setCorrect(newScore);
      setFeedback("Perfect order! ☕");

      if (round === coffeeOrders.length - 1) {
        setStatus("won");
      } else {
        setRound((r) => r + 1);
      }
    } else {
      setFeedback("Oops! That wasn't the order. Try another one!");
    }
  };

  if (status === "won") {
    return (
      <BirthdayWin
        message="Five perfect coffee orders! You're officially the café champion. ☕"
        onReplay={start}
        onHome={onHome}
      />
    );
  }

  return (
    <div className="mini-game">
      <div className="game-stats">
        <span>☕ Correct: {correct}/5</span>
        <span>Order {status === "ready" ? 0 : round + 1}/5</span>
      </div>

      {status === "ready" ? (
        <div className="game-instructions">
          <span className="big-game-emoji">☕</span>
          <h3>Welcome to your coffee shift!</h3>
          <p>Match each customer's description to the right coffee.</p>
          <button className="game-button" onClick={start}>
            Start the shift!
          </button>
        </div>
      ) : (
        <div className="coffee-order">
          <span className="big-game-emoji">{current.emoji}</span>
          <p className="order-label">CUSTOMER ORDER</p>
          <h3>{current.order}</h3>
          <div className="coffee-options">
            {options.map((option) => (
              <button
                key={option}
                className="coffee-option"
                onClick={() => choose(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="game-feedback" aria-live="polite">{feedback}</p>
        </div>
      )}
    </div>
  );
}

function PhoMemory({ onHome }) {
  const [sequence, setSequence] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [status, setStatus] = useState("ready");
  const [feedback, setFeedback] = useState("");

  const start = () => {
    const shuffled = [...phoIngredients].sort(() => Math.random() - 0.5);
    setSequence(shuffled.slice(0, 3));
    setChosen([]);
    setFeedback("");
    setStatus("playing");
  };

  const selectIngredient = (ingredient) => {
    if (chosen.some((item) => item.id === ingredient.id)) return;

    const next = [...chosen, ingredient];
    setChosen(next);

    if (ingredient.id !== sequence[next.length - 1].id) {
      setFeedback("Not quite! Let's try the recipe again. 🍜");
      setStatus("lost");
      return;
    }

    if (next.length === sequence.length) {
      setFeedback("Perfect memory! Your pho is ready. 🍜");
      setStatus("won");
    }
  };

  if (status === "won") {
    return (
      <BirthdayWin
        message="You remembered the whole recipe! May our friendship always stay this flavourful. 🍜"
        onReplay={start}
        onHome={onHome}
      />
    );
  }

  return (
    <div className="mini-game">
      <div className="game-stats">
        <span>🍜 Ingredients: {chosen.length}/{sequence.length || 3}</span>
        <span>Recipe memory</span>
      </div>

      {status === "ready" && (
        <div className="game-instructions">
          <span className="big-game-emoji">🍜</span>
          <h3>Can you remember the recipe?</h3>
          <p>Memorise three ingredients, then select them in the same order.</p>
          <button className="game-button" onClick={start}>
            Reveal my recipe
          </button>
        </div>
      )}

      {status === "playing" && (
        <div className="pho-game-area">
          <p className="order-label">REMEMBER THIS ORDER</p>
          <div className="recipe-sequence">
            {sequence.map((item, index) => (
              <div className="recipe-item" key={item.id}>
                <span>{index + 1}. {item.emoji}</span>
                <small>{item.name}</small>
              </div>
            ))}
          </div>
          <p>Now tap the ingredients in the correct order!</p>
          <div className="ingredient-options">
            {phoIngredients.map((item) => (
              <button
                key={item.id}
                className="ingredient-button"
                disabled={chosen.some((entry) => entry.id === item.id)}
                onClick={() => selectIngredient(item)}
              >
                <span>{item.emoji}</span>
                {item.name}
              </button>
            ))}
          </div>
          <p className="game-feedback" aria-live="polite">{feedback}</p>
        </div>
      )}

      {status === "lost" && (
        <div className="game-instructions">
          <span className="big-game-emoji">🍜</span>
          <h3>Let's try that recipe again!</h3>
          <p>{feedback}</p>
          <button className="game-button" onClick={start}>
            Try again ↻
          </button>
        </div>
      )}
    </div>
  );
}

function FoodGames() {
  const [selectedGame, setSelectedGame] = useState(null);

  const goHome = () => setSelectedGame(null);

  return (
    <section className="food-games-section" id="food-games">
      <p className="eyebrow">CHAPTER 04 · PLAY OUR MEMORIES</p>
      <h2>
        Pick your craving, <span>play our story.</span>
      </h2>
      <p className="food-games-intro">
        Three foods, three little adventures, and a birthday surprise
        waiting at the end of each game. Ready, sunshine? 💛
      </p>

      {!selectedGame ? (
        <div className="food-game-cards">
          {games.map((game) => (
            <button
              key={game.id}
              className={`food-game-card ${game.color}`}
              onClick={() => setSelectedGame(game.id)}
            >
              <span className="game-card-emoji">{game.emoji}</span>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <span className="play-label">PLAY GAME ↗</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="game-panel">
          <button className="back-button" onClick={goHome}>
            ← All games
          </button>

          {selectedGame === "dumplings" && (
            <>
              <h3 className="active-game-title">🥟 Dumpling Dash</h3>
              <DumplingDash onHome={goHome} />
            </>
          )}

          {selectedGame === "pret" && (
            <>
              <h3 className="active-game-title">☕ Pret Coffee Run</h3>
              <PretCoffeeRun onHome={goHome} />
            </>
          )}

          {selectedGame === "pho" && (
            <>
              <h3 className="active-game-title">🍜 Pho-nomenal Memory</h3>
              <PhoMemory onHome={goHome} />
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default FoodGames;
