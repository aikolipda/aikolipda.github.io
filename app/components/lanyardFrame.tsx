"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./lanyardCard.module.css";

type LanyardFrameProps = {
  variant: "main" | "mini";
  className?: string;
  label: string;
  backLabel: string;
  front: (flipped: boolean) => ReactNode;
  back: ReactNode;
};

export default function LanyardFrame({ variant, label, backLabel, front, back, className = "" }: LanyardFrameProps) {
  const [flipped, setFlipped] = useState(false);
  const dragged = useRef(false);
  const bounceRef = useRef<(() => void) | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const strap = strapRef.current;
    if (!stage || !card || !strap) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const restY = 125;
    const isMain = variant === "main";
    const initialScale = stage.getBoundingClientRect().width / stage.offsetWidth || 1;
    let entering = isMain && !motion.matches;
    let x = entering ? -18 : 0;
    let y = entering ? -stage.getBoundingClientRect().top / initialScale - card.offsetHeight - 30 : restY;
    let vx = entering ? 1.5 : 0, vy = 0;
    let bend = 0, bendVelocity = 0;
    const ribbonPaths = ribbonRef.current?.querySelectorAll("path");
    let frame = 0, last = 0, pointer: number | null = null;
    let previousX = 0, previousY = 0;
    let startX = 0, startY = 0;
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    // Limit the strap's reach rather than confining the card to its layout slot.
    function constrain() {
      if (entering) return;
      y = Math.max(50, y);
      const length = Math.hypot(x, y - 20);
      const reach = 210;
      if (length > reach) {
        const nx = x / length, ny = (y - 20) / length;
        x = nx * reach; y = 20 + ny * reach;
        const outwardSpeed = vx * nx + vy * ny;
        if (outwardSpeed > 0) { vx -= outwardSpeed * nx; vy -= outwardSpeed * ny; }
      }
    }
    function paint() {
      if (!card || !strap) return;
      const scale = stage!.getBoundingClientRect().width / stage!.offsetWidth || 1;
      const anchorY = variant === "main" ? -stage!.getBoundingClientRect().top / scale : 20;
      const angle = Math.atan2(x, Math.max(40, y - anchorY));
      const rotation = -angle * 0.65;
      card.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}rad)`;
      card.style.visibility = "visible";
      if (isMain) {
        // Attach at the top of the metal clip, including the card's rotation.
        const endX = x + Math.sin(rotation) * 18;
        const endY = y - Math.cos(rotation) * 18;
        strap.style.visibility = endY > anchorY ? "visible" : "hidden";
        const length = Math.max(0, endY - anchorY);
        const path = `M 0 ${anchorY - 24} C ${bend * .5} ${anchorY + length * .35}, ${endX + bend} ${endY - length * .28}, ${endX} ${endY}`;
        ribbonPaths?.forEach((ribbon) => ribbon.setAttribute("d", path));
      } else {
        strap.style.top = `${anchorY}px`;
        strap.style.height = `${Math.hypot(x, y - anchorY)}px`;
        strap.style.transform = `rotate(${-angle}rad)`;
      }
    }
    function tick(time: number) {
      const dt = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      if (motion.matches) { settle(); return; }
      // A slowly moving rest point keeps the strap and card swaying together.
      const idleX = Math.sin(time / 1100) * 9;
      const idleY = restY + Math.sin(time / 850) * 2;
      vx += ((idleX - x) * 0.014 - vx * 0.065) * dt;
      vy += ((idleY - y) * (entering ? .028 : .045) - vy * (entering ? .2 : .16)) * dt;
      bendVelocity += ((clamp(-vx * 5 + x * .12, -35, 35) - bend) * .035 - bendVelocity * .13) * dt;
      bend += bendVelocity * dt;
      x += vx * dt;
      y += vy * dt;
      if (entering && y >= restY) entering = false;
      constrain();
      paint();
      frame = requestAnimationFrame(tick);
    }
    function settle() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (motion.matches) { entering = false; bend = 0; bendVelocity = 0; x = 0; y = restY; vx = 0; vy = 0; paint(); }
      else { last = 0; frame = requestAnimationFrame(tick); }
    }
    function bounce() {
      if (motion.matches || pointer !== null) return;
      vy = -4.5;
      vx += x > 0 ? -1.8 : 1.8;
      settle();
    }
    bounceRef.current = bounce;
    function down(event: PointerEvent) {
      if (pointer !== null || event.button !== 0 || (event.target as Element).closest("a")) return;
      entering = false;
      dragged.current = false;
      startX = event.clientX; startY = event.clientY;
      stage!.dataset.dragging = "true";
      pointer = event.pointerId;
      card!.setPointerCapture(pointer);
      cancelAnimationFrame(frame); frame = 0;
      previousX = event.clientX; previousY = event.clientY; vx = 0; vy = 0;
    }
    function move(event: PointerEvent) {
      if (event.pointerId !== pointer) return;
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 6) dragged.current = true;
      const scale = stage!.getBoundingClientRect().width / stage!.offsetWidth;
      const dx = (event.clientX - previousX) / scale, dy = (event.clientY - previousY) / scale;
      x += dx; y += dy;
      constrain();
      vx = clamp(dx, -10, 10); vy = clamp(dy, -8, 8);
      previousX = event.clientX; previousY = event.clientY; paint();
    }
    function up(event: PointerEvent) {
      if (event.pointerId !== pointer) return;
      if (event.type === "pointercancel") dragged.current = true;
      delete stage!.dataset.dragging;
      pointer = null; settle();
    }
    function key(event: KeyboardEvent) {
      if (!event.key.startsWith("Arrow") || pointer !== null || (event.target as Element).closest("a")) return;
      entering = false;
      event.preventDefault(); cancelAnimationFrame(frame); frame = 0;
      x += event.key === "ArrowLeft" ? -22 : event.key === "ArrowRight" ? 22 : 0;
      y += event.key === "ArrowDown" ? 22 : event.key === "ArrowUp" ? -22 : 0;
      constrain();
      vx = vy = 0; paint();
    }
    function keyUp(event: KeyboardEvent) { if (event.key.startsWith("Arrow")) settle(); }
    const resize = new ResizeObserver(() => { constrain(); paint(); });
    resize.observe(stage);
    if (variant === "main") window.addEventListener("scroll", paint, { passive: true });
    card.addEventListener("pointerdown", down);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerup", up);
    card.addEventListener("pointercancel", up);
    card.addEventListener("lostpointercapture", up);
    card.addEventListener("keydown", key);
    card.addEventListener("keyup", keyUp);
    card.addEventListener("blur", settle);
    paint();
    settle();
    motion.addEventListener("change", settle);
    return () => {
      bounceRef.current = null;
      motion.removeEventListener("change", settle);
      cancelAnimationFrame(frame); resize.disconnect();
      window.removeEventListener("scroll", paint);
      card.removeEventListener("pointerdown", down);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerup", up);
      card.removeEventListener("pointercancel", up);
      card.removeEventListener("lostpointercapture", up);
      card.removeEventListener("keydown", key);
      card.removeEventListener("keyup", keyUp);
      card.removeEventListener("blur", settle);
    };
  }, [variant]);

  return (
    <div className={`${styles.stage} ${variant === "mini" ? styles.collectionStage : styles.mainStage} ${className}`}>
      <div ref={stageRef} className={styles.rig}>
      <div className={styles.lanyard}>
      {variant === "mini" && <div className={styles.anchor} aria-hidden="true" />}
      <div ref={strapRef} className={styles.strap} aria-hidden="true">
        {variant === "main" && (
          <svg ref={ribbonRef} className={styles.ribbon} width="1" height="1">
            <path className={styles.ribbonEdge} />
            <path className={styles.ribbonFabric} />
            <path className={styles.ribbonWeave} />
          </svg>
        )}
      </div>
      <div ref={cardRef} className={styles.card}
        onClick={(event) => {
          if ((event.target as Element).closest("a")) return;
          if (event.detail === 0 || !dragged.current) {
            setFlipped((value) => !value);
            bounceRef.current?.();
          }
        }}>
        <button type="button" className={styles.flipTarget}
          aria-label={`${label}. ${flipped ? backLabel : "Details side"}. Click to flip; drag or use arrow keys to swing.`}
          aria-pressed={flipped} />
        <span className={styles.clip} aria-hidden="true" />
        <span className={`${styles.flipper} ${flipped ? styles.flipped : ""}`}>
        <span className={styles.face} aria-hidden={flipped}>
        <span className={styles.top} aria-hidden="true">✳</span>
        {front(flipped)}
        </span>
        <span className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
          {back}
        </span>
        </span>
      </div>
      </div>
      </div>
    </div>
  );
}
