"use client";

import { useEffect, useRef } from "react";

export default function IntroCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const reveal = revealRef.current;
    const revealContext = reveal?.getContext("2d");
    if (!canvas || !context || !reveal || !revealContext) return;
    const artwork = document.createElement("canvas");
    const artworkContext = artwork.getContext("2d");
    if (!artworkContext) return;
    const image = new Image();
    const controller = new AbortController();
    let imageUrl: string | undefined;
    let disposed = false;

    // Keep the original character positions; add weight with a fine outline.
    fetch("/images/deco/intro-ascii.svg", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load ASCII artwork");
        return response.text();
      })
      .then((svg) => {
        if (disposed) return;
        const bold = svg.replace('fill="#52525b"', 'fill="#000" stroke="#000" stroke-width="0.3"');
        imageUrl = URL.createObjectURL(new Blob([bold], { type: "image/svg+xml" }));
        image.onload = cacheArtwork;
        image.src = imageUrl;
      })
      .catch(() => { /* Keep the pink trail if the artwork is unavailable. */ });

    function cacheArtwork() {
      artworkContext!.clearRect(0, 0, artwork.width, artwork.height);
      if (!image.naturalWidth) return;
      // Match the background's centered cover sizing exactly.
      const scale = Math.max(artwork.width / image.naturalWidth, artwork.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      artworkContext!.drawImage(image, (artwork.width - width) / 2, (artwork.height - height) / 2, width, height);
    }

    const enabled = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const lifetime = 650;
    let target: { x: number; y: number } | null = null;
    let follower: { x: number; y: number } | null = null;
    let previousFrame = 0;
    let lastMove = 0;
    let points: { x: number; y: number; time: number }[] = [];
    let frame = 0;

    function clear() {
      points = [];
      target = null;
      follower = null;
      previousFrame = 0;
      cancelAnimationFrame(frame);
      frame = 0;
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      revealContext!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function resize() {
      clear();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(window.innerWidth * ratio);
      canvas!.height = Math.round(window.innerHeight * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      reveal!.width = artwork.width = canvas!.width;
      reveal!.height = artwork.height = canvas!.height;
      revealContext!.setTransform(ratio, 0, 0, ratio, 0, 0);
      cacheArtwork();
    }

    function draw(now: number) {
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      revealContext!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const elapsed = previousFrame ? Math.min(now - previousFrame, 50) : 16;
      previousFrame = now;
      const moving = target && follower && Math.hypot(target.x - follower.x, target.y - follower.y) > 0.1;
      if (moving && target && follower) {
        // Time-based easing keeps the same feel across different refresh rates.
        const ease = 1 - Math.exp(-elapsed / 70);
        follower.x += (target.x - follower.x) * ease;
        follower.y += (target.y - follower.y) * ease;
        points.push({ ...follower, time: now });
      }
      points = points.filter((point) => now - point.time < lifetime);

      if (points.length > 1) {
        const first = points[0];
        const last = points[points.length - 1];
        const opacity = 0.28 * Math.max(0, 1 - (now - lastMove) / lifetime);
        const gradient = context!.createLinearGradient(first.x, first.y, last.x + 0.01, last.y);
        gradient.addColorStop(0, "rgba(244, 114, 182, 0)");
        gradient.addColorStop(1, `rgba(244, 114, 182, ${opacity})`);
        context!.strokeStyle = gradient;
        context!.lineWidth = 250;
        context!.lineCap = "round";
        context!.lineJoin = "round";
        // One continuous curve prevents darker overlapping segment joints.
        const path = new Path2D();
        path.moveTo(first.x, first.y);
        for (let i = 1; i < points.length - 1; i++) {
          const point = points[i];
          const next = points[i + 1];
          path.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
        }
        path.lineTo(last.x, last.y);
        context!.stroke(path);

        const mask = revealContext!.createLinearGradient(first.x, first.y, last.x + 0.01, last.y);
        mask.addColorStop(0, "transparent");
        mask.addColorStop(1, `rgba(0, 0, 0, ${opacity / 0.28})`);
        revealContext!.save();
        revealContext!.strokeStyle = mask;
        revealContext!.lineWidth = 250;
        revealContext!.lineCap = "round";
        revealContext!.lineJoin = "round";
        // Blur only the brush mask so the revealed characters stay crisp.
        revealContext!.filter = "blur(24px)";
        revealContext!.stroke(path);
        revealContext!.filter = "none";
        revealContext!.globalCompositeOperation = "source-in";
        revealContext!.drawImage(artwork, 0, 0, window.innerWidth, window.innerHeight);
        revealContext!.restore();
      }

      frame = points.length || moving ? requestAnimationFrame(draw) : 0;
      if (!frame) previousFrame = 0;
    }

    function move(event: PointerEvent) {
      if (!enabled.matches || event.pointerType === "touch") return;
      target = { x: event.clientX, y: event.clientY };
      lastMove = performance.now();
      if (!follower || !frame) {
        follower = { ...target };
        points = [{ ...follower, time: lastMove }];
      }
      if (!frame) frame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("blur", clear);
    document.documentElement.addEventListener("pointerleave", clear);
    enabled.addEventListener("change", clear);

    return () => {
      disposed = true;
      controller.abort();
      image.onload = null;
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      clear();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      window.removeEventListener("blur", clear);
      document.documentElement.removeEventListener("pointerleave", clear);
      enabled.removeEventListener("change", clear);
    };
  }, []);

  return (
    <>
      <canvas ref={revealRef} aria-hidden="true" className="intro-ascii-reveal" />
      <canvas ref={canvasRef} aria-hidden="true" className="intro-cursor-trail" />
    </>
  );
}
