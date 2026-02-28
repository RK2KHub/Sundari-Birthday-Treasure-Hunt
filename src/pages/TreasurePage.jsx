import React, { useEffect, useMemo, useState } from "react";
import BackgroundFX from "../components/BackgroundFX.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { GAME, TREASURES } from "../gameConfig.js";
import Slideshow from "../components/Slideshow.jsx";
import TimerPill from "../components/TimerPill.jsx";

function norm(s){
  return (s ?? "").toString().trim().toLowerCase().replace(/\s+/g," ").replace(/[._-]/g,"");
}

function resetAndHome(nav){
  sessionStorage.clear();
  localStorage.removeItem("treasure-progress");
  nav("/", { replace: true });
}

export default function TreasurePage() {
  const { id } = useParams();
  const pageId = Number(id);
  const nav = useNavigate();

  const data = TREASURES.find(t => t.id === pageId);

  // Images served from /public (supports .jpg/.JPG/.png/.webp, etc.)
  const folder = useMemo(() => `assets/treasures/t${pageId}`, [pageId]);

  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);

  const deadlineMs = useMemo(() => Date.now() + GAME.TIME_LIMIT_MS, [pageId]);

  useEffect(() => {
    setAnswer("");
    setMsg("");
    setOk(false);
  }, [pageId]);

  useEffect(() => {
    if (!data) resetAndHome(nav);
  }, [data, nav]);

  const onExpire = () => {
    setMsg("Time’s up — restarting from Home 💫");
    setTimeout(() => resetAndHome(nav), 400);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data) return;

    const val = norm(answer);
    const accepted = (data.answers ?? []).map(norm);

    if (accepted.includes(val)) {
      setOk(true);
      setMsg("Unlocked ✨");
      localStorage.setItem("treasure-progress", String(pageId));
    } else {
      setOk(false);
      setMsg("Wrong answer — restarting from Home ❤️");
      setTimeout(() => resetAndHome(nav), 450);
    }
  };

  const goNext = () => {
    if (!ok) return;
    if (pageId >= GAME.TOTAL) {
      nav("/final");
      return;
    }
    nav(`/treasure/${pageId + 1}`);
  };

  return (
    <div className="page page--full">
      <BackgroundFX density={10} enablePop={true} />
      <div className="treasure">
        <div className="treasure__head">
          <div className="pill">{data?.title ?? "Treasure"}</div>
          <div className="right">
            <TimerPill deadlineMs={deadlineMs} onExpire={onExpire} />
          </div>
        </div>

        <Slideshow folder={folder} count={4} intervalMs={7000} />

        <div className="treasure__card">
          <p className="p p--muted"><b>Hint:</b> {data?.hint}</p>
          <form className="qa" onSubmit={onSubmit}>
            <label className="label">
              {data?.question}
              <input
                className="input"
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                placeholder="Type your answer…"
                autoComplete="off"
              />
            </label>
            <div className="row">
              <button className="btn" type="submit">Unlock</button>
              <button className="btn btn--ghost" type="button" disabled={!ok} onClick={goNext}>
                Next →
              </button>
            </div>
            {msg ? <div className={"msg " + (ok ? "msg--ok" : "msg--bad")}>{msg}</div> : null}
          </form>

          <div className="hr" />

          <div className={"poem" + (ok ? " poem--unlocked" : " poem--locked")} aria-live="polite">
            <div className="poem__title">A little poem</div>
            <pre className="poem__text">{data?.poem}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
