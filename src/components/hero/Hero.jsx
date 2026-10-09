
import React from "react";

function Hero() {
  const exploreMemories = () => {
    document.getElementById("food")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-sun">☀️</div>

      <p className="eyebrow">A LITTLE SURPRISE FOR SOMEONE SPECIAL</p>

      <h1>
        Happy Birthday,
        <br />
        <span>Harry Sunshine!</span>
      </h1>

      <p className="hero-description">
        To my favourite food explorer, my partner in countless
        adventures, and a friend who makes ordinary days special.
        This little corner of the internet is just for you. 💛
      </p>

      <button className="primary-button" onClick={exploreMemories}>
        Let's explore our memories ↓
      </button>

      <div className="hero-doodle doodle-one">✿</div>
      <div className="hero-doodle doodle-two">♡</div>
      <div className="hero-doodle doodle-three">✦</div>
    </section>
  );
}

export default Hero;
