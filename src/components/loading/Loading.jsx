
import React, { useEffect, useState } from "react";
import "./Loading.css";

function LoadingScreen({ onComplete }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setLeaving(true), 4500);
    const completeTimer = setTimeout(onComplete, 5000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${leaving ? "loading-exit" : ""}`}>
      <div className="loading-content">
        <div className="loading-sun">☀️</div>
        <h1>A little sunshine...</h1>
        <p>Preparing a little happiness for you 💛</p>

        <div className="loading-track">
          <div className="loading-progress" />
        </div>

        <span className="loading-caption">MADE WITH LOVE ♡</span>
      </div>
    </div>
  );
}

export default LoadingScreen;
