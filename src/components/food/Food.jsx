
import React, { useState } from "react";
import "./Food.css";

const foodMemories = [
  {
    name: "Dumpling Adventures",
    emoji: "🥟",
    subtitle: "Little bites, big memories",
    description:
      "Our dumpling adventures! Good food, great company, and memories that make every bite even better.",
    color: "#ffe4a8",
    number: "01",
  },
  {
    name: "Pret Coffee",
    emoji: "☕",
    subtitle: "Coffee & conversations",
    description:
      "Coffee breaks, random talks, and those conversations that make even an ordinary day feel special.",
    color: "#f4d5b4",
    number: "02",
  },
  {
    name: "Vietnamese Pho",
    emoji: "🍜",
    subtitle: "Pho-nomenal times",
    description:
      "A bowl full of flavour and another food adventure to add to our collection of unforgettable memories.",
    color: "#ffd1b8",
    number: "03",
  },
  {
    name: "Our Foodie Adventures",
    emoji: "🍟🍕🍰",
    subtitle: "Always hungry for adventure",
    description:
      "Trying new things, discovering favourite flavours, and finding another excuse to go out together.",
    color: "#ffedb5",
    number: "04",
  },
  {
    name: "The Next Food Stop",
    emoji: "🍽️✨",
    subtitle: "To be continued...",
    description:
      "More restaurants to discover, more food to try, and more memories waiting to be made together.",
    color: "#e6e0ff",
    number: "05",
  },
];

function FoodAdventures() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentFood = foodMemories[currentIndex];

  const nextIndex = (currentIndex + 1) % foodMemories.length;
  const previousIndex =
    (currentIndex - 1 + foodMemories.length) % foodMemories.length;

  function changeCard(step) {
    if (isAnimating) return;

    setDirection(step > 0 ? "next" : "previous");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(
        (index) =>
          (index + step + foodMemories.length) % foodMemories.length
      );
      setIsAnimating(false);
    }, 260);
  }

  function goToCard(index) {
    if (isAnimating || index === currentIndex) return;

    setDirection(index > currentIndex ? "next" : "previous");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 260);
  }

  return (
    <section
      className="section food-section"
      id="food-adventures"
    >
      <p className="eyebrow">CHAPTER 01 · OUR FOOD DIARIES</p>

      <h2>
        Good food, <span>better company.</span>
      </h2>

      <p className="section-description">
        Every food stop has its own story. From dumplings to
        coffee breaks and Vietnamese pho, these are some of
        the flavours that became part of our adventures. 💛
      </p>

      <div className="food-deck">
        {/* Cards stacked behind the active card */}
        <div
          className="food-stack-card food-stack-back"
          style={{
            backgroundColor: foodMemories[previousIndex].color,
          }}
        />

        <div
          className="food-stack-card food-stack-middle"
          style={{
            backgroundColor: foodMemories[nextIndex].color,
          }}
        />

        {/* Active food card */}
        <button
          type="button"
          className={`food-main-card ${
            isAnimating ? `food-card-${direction}` : ""
          }`}
          style={{ "--food-card-color": currentFood.color }}
          onClick={() => changeCard(1)}
          disabled={isAnimating}
          aria-label={`${currentFood.name}. Click to see the next food memory.`}
        >
          <div className="food-card-topline">
            <span>OUR FOOD DIARIES</span>
            <span>
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(foodMemories.length).padStart(2, "0")}
            </span>
          </div>

          <div className="food-card-illustration">
            <span className="food-sparkle food-sparkle-one">✦</span>
            <span className="food-sparkle food-sparkle-two">✧</span>
            <span className="food-card-emoji">
              {currentFood.emoji}
            </span>
            <span className="food-card-heart">♡</span>
          </div>

          <div className="food-card-details">
            <span className="food-card-subtitle">
              {currentFood.subtitle}
            </span>

            <h3>{currentFood.name}</h3>

            <p>{currentFood.description}</p>
          </div>

          <div className="food-card-bottom">
            <span>Made with love</span>
            <span>💛 Tap for more</span>
          </div>
        </button>
      </div>

      <div className="food-controls">
        <button
          type="button"
          className="food-nav-button"
          onClick={() => changeCard(-1)}
          disabled={isAnimating}
          aria-label="Previous food memory"
        >
          ←
        </button>

        <div className="food-progress">
          {foodMemories.map((food, index) => (
            <button
              type="button"
              key={food.name}
              className={`food-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToCard(index)}
              aria-label={`Go to ${food.name}`}
              aria-current={index === currentIndex ? "step" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="food-nav-button"
          onClick={() => changeCard(1)}
          disabled={isAnimating}
          aria-label="Next food memory"
        >
          →
        </button>
      </div>

      <p className="food-hint">
        🍴 Tap the card to discover our next food adventure
      </p>

      <p className="food-ending">
        The food was delicious, but the company made it special. 💛
      </p>
    </section>
  );
}

export default FoodAdventures;
