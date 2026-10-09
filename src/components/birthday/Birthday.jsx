
import React, { useState } from "react";

function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="letter-section" id="letter">
      <div className="letter-card">
        <div className="letter-envelope">💌</div>

        <p className="eyebrow">CHAPTER 03 · A MESSAGE FROM MY HEART</p>

        <h2>
          A little letter <span>for you.</span>
        </h2>

        <p className="letter-intro">
          There is something I want you to know on your special day.
        </p>

        <button
          className="primary-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {isOpen ? "Close your letter ♡" : "Open your letter ♡"}
        </button>

        {isOpen && (
          <div className="letter-content">
            <p>Dear Harry Potter,</p>

            <p>Happy Birthday to one of the most special people in my life! 💛</p>

            <p>
              Sometimes, I wonder how certain people become such an important part of our lives without even realising it. And then I think of you. Somewhere between our conversations, our random plans, our laughter, our little adventures, and all those ordinary days, you became someone truly special to me.
            </p>

            <p>
              When I think about our friendship, I don't remember just one particular moment. I remember a collection of little things — the conversations that went on longer than expected, the silly things that made us laugh, the places we explored, the memories we created, and even the moments when doing absolutely nothing felt like enough.
            </p>

            <p>
              I'm grateful for every memory we've made together, for every adventure we've shared, and for all the times you've made an ordinary day feel a little more special. It's funny how the smallest moments sometimes become the memories we treasure the most.
            </p>

            <p>
              On your birthday, I want you to know that you're so much more than just a friend to me. You're someone whose presence I genuinely appreciate, someone I'm glad I got to know, and someone I hope life brings countless beautiful things to.
            </p>
            
            <p>
                I hope you keep exploring the world, discovering new things, laughing without holding back, taking chances, making beautiful memories, and being the amazing person you are. And I hope there are many more adventures, conversations, unexpected plans, and unforgettable moments for us to share along the way.
            </p>

            <p>
                Thank you for being a part of my story. No matter how busy life gets or how much things change, I will always be grateful for the memories we've created and the friendship we share.
            </p>

            <p>Happy Birthday, sunshine. Keep shining! ☀️</p>

            <p className="letter-signature">
              Your best friend, always ♡
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BirthdayLetter;
