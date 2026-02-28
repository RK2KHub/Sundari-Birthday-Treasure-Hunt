import React, { useEffect, useMemo, useState } from "react";

/**
 * Lightweight birthday FX:
 * - Floating balloons (CSS animated)
 * - Twinkling sparkles
 * - Click/tap anywhere to create a small "pop" burst
 */
export default function BackgroundFX({ density = 10, enablePop = true }) {
  const balloons = useMemo(() => {
    const arr = [];
    for (let i = 0; i < density; i++) {
      arr.push({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.random() * 6,
        dur: 10 + Math.random() * 12,
        scale: 0.75 + Math.random() * 0.65,
        sway: 10 + Math.random() * 22,
      });
    }
    return arr;
  }, [density]);

  const sparkles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        id: i,
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 100),
        delay: Math.random() * 4,
        dur: 2.4 + Math.random() * 3.2,
        size: 6 + Math.random() * 10,
      });
    }
    return arr;
  }, []);

  const [pops, setPops] = useState([]);

  useEffect(() => {
    if (!enablePop) return;
    const onClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const id = Date.now() + Math.random();
      setPops((p) => [...p, { id, x, y }]);
      window.setTimeout(() => {
        setPops((p) => p.filter((pp) => pp.id !== id));
      }, 650);
    };
    window.addEventListener("pointerdown", onClick, { passive: true });
    return () => window.removeEventListener("pointerdown", onClick);
  }, [enablePop]);

  return (
    <div className="fx" aria-hidden="true">
      <div className="fx__sparkles">
        {sparkles.map((s) => (
          <span
            key={s.id}
            className="sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="fx__balloons">
        {balloons.map((b) => (
          <div
            key={b.id}
            className="balloon"
            style={{
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
              transform: `translate3d(0,0,0) scale(${b.scale})`,
              "--sway": `${b.sway}px`,
            }}
          >
            <div className="balloon__knot" />
            <div className="balloon__string" />
          </div>
        ))}
      </div>

      {pops.map((p) => (
        <div
          key={p.id}
          className="pop"
          style={{ left: `${p.x}px`, top: `${p.y}px` }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="pop__bit" style={{ "--i": i }} />
          ))}
        </div>
      ))}
    </div>
  );
}
