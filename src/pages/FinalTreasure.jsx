import React, { useEffect, useMemo, useState } from "react";
import BackgroundFX from "../components/BackgroundFX.jsx";
import { useNavigate } from "react-router-dom";

function pad2(n){ return String(n).padStart(2, "0"); }

export default function FinalTreasure(){
  const nav = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  // Wedding date: June 4, 2026 (local time)
  const target = useMemo(() => new Date(2026, 5, 4, 0, 0, 0), []);
  const [leftMs, setLeftMs] = useState(Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    // Only allow access after finishing Treasure 8
    const progress = Number(localStorage.getItem("treasure-progress") || "0");
    if (progress < 8) {
      nav("/", { replace: true });
      return;
    }
    const t = setInterval(() => {
      setLeftMs(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(t);
  }, [nav, target]);

  const days = Math.floor(leftMs / 86400000);
  const hrs = Math.floor((leftMs % 86400000) / 3600000);
  const mins = Math.floor((leftMs % 3600000) / 60000);
  const secs = Math.floor((leftMs % 60000) / 1000);

  const unlock = () => {
    const v = (pw || "").trim().toLowerCase();
    const ok = ["sundari2802", "rs2802", "2802"].includes(v);
    if (ok){
      setUnlocked(true);
      setMsg("Unlocked 💙");
    } else {
      setUnlocked(false);
      setMsg("Wrong password. Try: special occassions");
    }
  };

  const restart = () => {
    sessionStorage.clear();
    localStorage.removeItem("treasure-progress");
    nav("/", { replace: true });
  };

  return (
    <div className="page page--full">
      <BackgroundFX density={10} enablePop={true} />
      <div className="treasure">
        <div className="treasure__head">
          <div className="pill">Final Treasure • Wedding Card</div>
        </div>

        <div className="treasure__card">
          {!unlocked ? (
            <>
              <h2 className="h2">Locked for Sundari 🔒</h2>
              <p className="p p--muted">
                Enter the password to open the final card:
                <b> Sundari2802 </b> / <b> RS2802 </b> / <b> 2802 </b>
              </p>

              <div className="row">
                <input
                  className="input"
                  value={pw}
                  onChange={(e)=>setPw(e.target.value)}
                  placeholder="Password…"
                  autoComplete="off"
                />
                <button className="btn" onClick={unlock}>Unlock</button>
                <button className="btn btn--ghost" onClick={restart}>Home</button>
              </div>

              {msg ? <div className={"msg " + (unlocked ? "msg--ok" : "msg--bad")}>{msg}</div> : null}
            </>
          ) : (
            <>
              <div className="finalHeader">
                <div>
                  <div className="finalTitle">Wedding Countdown</div>
                  <div className="tiny">June 4, 2026</div>
                </div>
                <div className="finalCountdown" aria-label="Countdown to wedding">
                  <div className="finalBox">
                    <div className="finalN">{days}</div>
                    <div className="finalL">Days</div>
                  </div>
                  <div className="finalBox">
                    <div className="finalN">{pad2(hrs)}</div>
                    <div className="finalL">Hours</div>
                  </div>
                  <div className="finalBox">
                    <div className="finalN">{pad2(mins)}</div>
                    <div className="finalL">Min</div>
                  </div>
                  <div className="finalBox">
                    <div className="finalN">{pad2(secs)}</div>
                    <div className="finalL">Sec</div>
                  </div>
                </div>
              </div>

              <div className="finalCard">
                <div className="finalTop">
                  <div className="finalCircle">
                                          <img src={import.meta.env.BASE_URL + "assets/couple/left.JPG"} alt="Couple photo left" className="couple-circle" />
                  </div>
                  <div className="finalCircle">
                    <img src={import.meta.env.BASE_URL + "assets/couple/right.JPG"} alt="Couple photo right" />
                  </div>
                </div>

                <div className="finalInvite">
                                      <img src={import.meta.env.BASE_URL + "assets/doodles/wedding-card-ai.png"} alt="Chettinad wedding invitation card" className="couple-circle" />
                </div>
              </div>

              <div className="hr" />

              <p className="p">
                Your final treasure is this invitation card ❤️
                <span className="tiny"> (You can edit the text in <b>FinalTreasure.jsx</b>)</span>
              </p>

              <div className="row">
                <button className="btn btn--ghost" onClick={restart}>Restart from Home ↺</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
