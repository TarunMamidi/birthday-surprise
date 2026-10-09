
import React, { useState } from "react";
import "./Memories.css";

const memories = [
  {
    place: "Canary Wharf",
    emoji: "🌆",
    subtitle: "Our city adventure",
    description:
      "Exploring Canary Wharf together, enjoying the city views, and making memories that will always make me smile.",
    color: "#ffe69a",
  },
  {
    place: "Liverpool Street",
    emoji: "🚶‍♀️",
    subtitle: "Wandering together",
    description:
      "Walking around, discovering places, and having those random conversations that make every outing special.",
    color: "#ffd6a5",
  },
  {
    place: "Greenwich",
    emoji: "🌳",
    subtitle: "A beautiful day",
    description:
      "Discovering Greenwich together and turning another place into a lovely part of our friendship story.",
    color: "#d9edc2",
  },
  {
    place: "Dumpling Adventures",
    emoji: "🥟",
    subtitle: "Foodie memories",
    description:
      "Sharing good food, enjoying every bite, and proving that food adventures are better with the right person.",
    color: "#ffcdb2",
  },
  {
    place: "Pret Coffee",
    emoji: "☕",
    subtitle: "Coffee & conversations",
    description:
      "Coffee breaks, endless talking, random laughs, and simple moments that became special memories.",
    color: "#f8dfb2",
  },
  {
    place: "Vietnamese Pho",
    emoji: "🍜",
    subtitle: "Pho-nomenal times",
    description:
      "Another food adventure, another story, and another reason to be grateful for our friendship.",
    color: "#f5c2d4",
  },
  {
    place: "More adventures ahead",
    emoji: "🗺️",
    subtitle: "To be continued...",
    description:
      "We've already explored so many places, but there are still so many adventures, laughs, and memories waiting for us.",
    color: "#d9d7ff",
  },
];

function Memories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentMemory = memories[currentIndex];
  const nextIndex = (currentIndex + 1) % memories.length;
  const previousIndex =
    (currentIndex - 1 + memories.length) % memories.length;

  function changeCard(step) {
    if (isAnimating) return;

    setDirection(step > 0 ? "next" : "previous");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(
        (index) => (index + step + memories.length) % memories.length
      );
      setIsAnimating(false);
    }, 260);
  }

  return (
    <section className="section memories-section" id="memories">
      <p className="eyebrow">CHAPTER 02 · OUR LITTLE MEMORY DECK</p>

      <h2>
        Every card holds <span>a memory. 💛</span>
      </h2>

      <p className="section-description">
        A little collection of places we've been, food we've
        enjoyed, and adventures we've shared. Click the card
        to turn the page of our friendship story.
      </p>

      <div className="memory-deck">
        {/* Decorative cards behind the main card */}
        <div
          className="memory-stack-card memory-stack-back"
          style={{ backgroundColor: memories[previousIndex].color }}
        />

        <div
          className="memory-stack-card memory-stack-middle"
          style={{ backgroundColor: memories[nextIndex].color }}
        />

        {/* Active memory card */}
        <button
          type="button"
          className={`memory-main-card ${
            isAnimating ? `card-${direction}` : ""
          }`}
          style={{ "--card-color": currentMemory.color }}
          onClick={() => changeCard(1)}
          disabled={isAnimating}
          aria-label={`Memory: ${currentMemory.place}. Click to see the next memory.`}
        >
          <div className="memory-card-topline">
            <span>OUR MEMORY BOOK</span>
            <span>
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(memories.length).padStart(2, "0")}
            </span>
          </div>

          <div className="memory-card-illustration">
            <span className="memory-card-sparkle sparkle-one">✦</span>
            <span className="memory-card-sparkle sparkle-two">✧</span>
            <span className="memory-card-emoji">{currentMemory.emoji}</span>
            <span className="memory-card-heart">♡</span>
          </div>

          <div className="memory-card-details">
            <span className="memory-card-subtitle">
              {currentMemory.subtitle}
            </span>

            <h3>{currentMemory.place}</h3>

            <p>{currentMemory.description}</p>
          </div>

          <div className="memory-card-bottom">
            <span>Made with friendship</span>
            <span>💛 Tap to discover</span>
          </div>
        </button>
      </div>

      <div className="memory-controls">
        <button
          type="button"
          className="memory-nav-button"
          onClick={() => changeCard(-1)}
          disabled={isAnimating}
          aria-label="Previous memory"
        >
          ←
        </button>

        <div className="memory-progress">
          {memories.map((memory, index) => (
            <button
              type="button"
              key={memory.place}
              className={`memory-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => {
                if (!isAnimating && index !== currentIndex) {
                  setDirection(index > currentIndex ? "next" : "previous");
                  setIsAnimating(true);

                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsAnimating(false);
                  }, 260);
                }
              }}
              aria-label={`Go to memory ${index + 1}: ${memory.place}`}
              aria-current={index === currentIndex ? "step" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="memory-nav-button"
          onClick={() => changeCard(1)}
          disabled={isAnimating}
          aria-label="Next memory"
        >
          →
        </button>
      </div>

      <p className="memory-hint">
        ✨ Tap the card or use the arrows to explore our memories
      </p>

      <div className="memories-footer">
        <span>💌</span>
        <p>
          Different places, different adventures, one friendship
          I'll always be grateful for.
        </p>
        <span className="memories-footer-note">
          Our story is still being written... 💛
        </span>
      </div>
    </section>
  );
}

export default Memories;
