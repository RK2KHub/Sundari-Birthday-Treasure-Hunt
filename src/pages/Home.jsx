import React, { useEffect } from "react";
import BackgroundFX from "../components/BackgroundFX.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  useEffect(() => {
    // Reset game when landing on Home
    sessionStorage.clear();
    localStorage.removeItem("treasure-progress");
  }, []);

  return (
    <div className="page">
      <div className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__card">
          <div className="pill">A Game to unlock treasures</div>
          <h1 className="h1">Happy Birthday, Sundari ❤️</h1>
          <p className="p">
            8 treasure pages. Each page has a 4-photo slideshow, a small poem, and one romantic question.
            Answer correctly to unlock the next page.
          </p>
          <div className="row">
            <button className="btn" onClick={() => nav("/treasure/1")}>
              Start the Hunt →
            </button>
            <button className="btn btn--ghost" onClick={() => nav("/treasure/1")}>
              Replay from Start ↺
            </button>
          </div>
          <p className="tiny">
            Rules: You get <b>5 minutes</b> on each page. Wrong answer or timeout → back to Home and restart.
          </p>
        </div>
      </div>
    </div>
  );
}
