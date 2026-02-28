import React, { useEffect, useState } from "react";

function pad2(n){ return String(n).padStart(2, "0"); }

export default function TimerPill({ deadlineMs, onExpire }) {
  const [left, setLeft] = useState(Math.max(0, deadlineMs - Date.now()));

  useEffect(() => {
    const t = setInterval(() => {
      const next = Math.max(0, deadlineMs - Date.now());
      setLeft(next);
      if (next <= 0) {
        clearInterval(t);
        onExpire?.();
      }
    }, 250);
    return () => clearInterval(t);
  }, [deadlineMs, onExpire]);

  const sec = Math.floor(left / 1000);
  const mm = Math.floor(sec / 60);
  const ss = sec % 60;

  return (
    <span className="timerPill" title="Time left to answer">
      ⏳ {pad2(mm)}:{pad2(ss)}
    </span>
  );
}
