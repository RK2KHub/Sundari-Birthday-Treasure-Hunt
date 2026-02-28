import React, { useEffect, useMemo, useState } from "react";

const EXTS = ["jpg","jpeg","png","webp","JPG","JPEG","PNG","WEBP"];

function joinUrl(base, path) {
  const b = (base || "/").endsWith("/") ? (base || "/") : (base || "/") + "/";
  const p = String(path || "").replace(/^\/+/, "");
  return b + p;
}

function loadFirstAvailable(urls) {
  return new Promise((resolve) => {
    let i = 0;
    const img = new Image();
    const tryNext = () => {
      if (i >= urls.length) return resolve(null);
      img.onload = () => resolve(urls[i]);
      img.onerror = () => { i += 1; tryNext(); };
      img.src = urls[i];
    };
    tryNext();
  });
}

async function resolveFolderImages(folder, count) {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const out = [];
  for (let i = 1; i <= count; i++) {
    const base = joinUrl(baseUrl, `${folder}/${i}.`);
    const urls = EXTS.map((ext) => base + ext);
    const found = await loadFirstAvailable(urls);
    if (found) out.push(found);
  }
  return out;
}

/**
 * Slideshow (Netflix-style): fits images automatically (no cropping) using object-fit: contain,
 * then applies a slow "fit → zoom" (Ken Burns) animation on the active slide.
 */
export default function Slideshow({ folder, count = 4, intervalMs = 7000 }) {
  const safeFolder = useMemo(
    () => (folder || "").replace(/\/+$/,"").replace(/^\/+/, ""),
    [folder]
  );

  const [images, setImages] = useState([]);
  const [idx, setIdx] = useState(0);
  const [debugUrl, setDebugUrl] = useState("");

  useEffect(() => {
    let alive = true;
    setImages([]);
    setIdx(0);

    const baseUrl = import.meta.env.BASE_URL || "/";
    const sample = joinUrl(baseUrl, `${safeFolder}/1.jpg`);
    setDebugUrl(sample);

    if (!safeFolder) return;

    resolveFolderImages(safeFolder, count).then((imgs) => {
      if (!alive) return;
      setImages(imgs);
    });

    return () => { alive = false; };
  }, [safeFolder, count]);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [images.length, intervalMs]);

  if (!safeFolder) return <div className="slideshow slideshow--empty">Missing folder</div>;

  if (!images.length) {
    return (
      <div className="slideshow slideshow--empty">
        No images found. Put files in:<br/>
        <b>public/{safeFolder}/1..{count}</b> (jpg/JPG/png/webp)<br/>
        <span style={{opacity:.7, fontSize:12}}>Debug URL: {debugUrl}</span>
      </div>
    );
  }

  return (
    <div className="slideshow" aria-label="Photo slideshow">
      {images.map((src, i) => (
        <div key={src + i} className={"slide" + (i === idx ? " is-on" : "")}>
          {/* Backdrop layer (blurred) for a premium feel */}
          <img className="slide__backdrop" src={src} alt="" aria-hidden="true" />
          {/* Foreground fitted image */}
          <img className="slide__img" src={src} alt="" draggable="false" />
        </div>
      ))}
      <div className="slideshow__veil" aria-hidden="true" />
    </div>
  );
}
