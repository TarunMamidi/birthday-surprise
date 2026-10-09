
import { useState } from 'react';
import './BirthdaySurprise.css';

const hearts = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  delay: `${(index % 8) * 0.12}s`,
  duration: `${2.2 + (index % 5) * 0.35}s`,
  size: `${14 + (index % 4) * 5}px`,
  symbol: index % 3 === 0 ? '🦋' : '♥',
}));

export default function BirthdaySurprise() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="birthday-surprise"
      className={`birthday-surprise ${isOpen ? 'surprise-open' : ''}`}
    >
      <div className="surprise-heading">
        <span className="surprise-eyebrow">
          A little something from my heart
        </span>

        <h2>A Surprise for Harry 💛</h2>

        <p>
          Some feelings are too special for an ordinary birthday card.
        </p>
      </div>

      <div className="surprise-stage">
        {isOpen && (
          <div className="surprise-particles" aria-hidden="true">
            {hearts.map((heart) => (
              <span
                key={heart.id}
                className="surprise-particle"
                style={{
                  '--left': heart.left,
                  '--delay': heart.delay,
                  '--duration': heart.duration,
                  '--size': heart.size,
                }}
              >
                {heart.symbol}
              </span>
            ))}
          </div>
        )}

        {!isOpen ? (
          <div className="envelope-wrap">
            <div className="envelope" aria-hidden="true">
              <div className="envelope-letter">
                <span>For Harry, with love</span>
                <span className="letter-heart">♥</span>
              </div>
              <div className="envelope-pocket" />
              <div className="envelope-flap" />
              <div className="envelope-seal">♥</div>
            </div>

            <button
              className="surprise-button"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              Open Your Little Surprise ✨
            </button>
          </div>
        ) : (
          <article className="surprise-letter" aria-live="polite">
            <div className="letter-decoration" aria-hidden="true">
              🌼 🦋 🌼
            </div>

            <p className="letter-greeting">My dearest Harry,</p>

            <p>
              Happy Birthday to someone who means more to me than words
              could ever fully explain.
            </p>

            <p>
              Sometimes, life brings us people who quietly become a very
              special part of our world. You are one of those people for
              me. Your presence, your smile, and the memories we share
              mean more than you might ever realise.
            </p>

            <p>
              I may not always find the perfect words to tell you how
              much you matter to me, but I hope you never doubt that
              your place in my life is special. Even on difficult days,
              I hope you remember how much happiness you bring to the
              people who care about you.
            </p>

            <p>
              On your birthday, I wish you a life filled with gentle
              happiness, beautiful surprises, dreams that come true,
              and people who love you for exactly who you are. You
              deserve the kind of happiness that stays long after the
              candles have gone out.
            </p>

            <p>
              No matter how much life changes or how far our journeys
              take us, I hope we always have memories to smile about,
              little things to laugh at, and reasons to be grateful
              that our paths crossed.
            </p>

            <p className="letter-ending">
              You'll always be my little sunshine. ☀️
            </p>

            <p className="letter-signoff">
              Made with all my heart, just for you. 💛
            </p>

            <button
              className="surprise-button replay-button"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Fold the Letter Again 💌
            </button>
          </article>
        )}
      </div>
    </section>
  );
}
