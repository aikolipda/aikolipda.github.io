"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import IntroCursorTrail from "./introCursorTrail";
import IntroTypedName from "./introTypedName";
import { useRouter } from "next/navigation";
import { markIntroSeen } from "../lib/intro-session";

export default function IntroScreen({ home }: { home: ReactNode }) {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const splashRef = useRef<HTMLElement>(null);

  const enterPortfolio = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;

    markIntroSeen();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.replace("/home");
      return;
    }
    
    setLeaving(true);
    timer.current = setTimeout(() => router.replace("/home"), 1500);
  }, [router]);

  useEffect(() => {
    router.prefetch("/home");
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [router]);

  useEffect(() => {
    const splash = splashRef.current;
    if (!splash) return;
    let scrollAmount = 0;
    let lastWheel = 0;
    const onWheel = (event: WheelEvent) => {
      // Let shorter screens scroll through the intro before entering home.
      if (splash.scrollTop + splash.clientHeight < splash.scrollHeight - 2) return;
      const now = performance.now();
      if (now - lastWheel > 200) scrollAmount = 0;
      lastWheel = now;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? splash.clientHeight : 1);
      scrollAmount = Math.max(0, scrollAmount + delta);
      if (scrollAmount > 90) enterPortfolio();
    };
    splash.addEventListener("wheel", onWheel, { passive: true });
    return () => splash.removeEventListener("wheel", onWheel);
  }, [enterPortfolio]);

  return (
    <>
    {leaving && <div className="intro-home-preview" aria-hidden="true" inert>{home}</div>}
    <main
      ref={splashRef}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
      }}
      onTouchCancel={() => { touchStart.current = null; }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const touch = event.changedTouches[0];
        const up = start.y - touch.clientY;
        const splash = event.currentTarget;
        if (up > 70 && up > Math.abs(start.x - touch.clientX) * 1.5 &&
            splash.scrollTop + splash.clientHeight >= splash.scrollHeight - 2) enterPortfolio();
      }}
      aria-labelledby="splash-title"
      className={`intro-splash text-black${leaving ? " intro-splash-leaving" : ""}`}
    >
        <IntroCursorTrail />
        <div className="relative flex min-h-full flex-col items-end justify-center px-12 pt-12 pb-32 text-right sm:px-12 lg:px-50 xl:px-60">
          {/*<p className="mb-10 text-xs uppercase tracking-[0.3em] text-black">
            A little corner of the internet
          </p>*/}
          {/*<div className="relative mb-7">
            <div aria-hidden="true" className="absolute inset-0 scale-125 rounded-full bg-rose-200/40 blur-2xl dark:bg-rose-400/15" />
            <Image
              src="/images/deco/IMG_9588.png"
              alt=""
              width={150}
              height={150}
              priority
              className="relative h-36 w-36 -rotate-12 object-contain sm:h-44 sm:w-44"
            />
            <span aria-hidden="true" className="absolute -right-8 top-2 text-3xl text-rose-400">✦</span>
          </div>*/}
          <p className="mb-3 text-lg text-black">Hello there!</p>
          <h1 id="splash-title" className="font-hand text-6xl tracking-wide">
            <IntroTypedName />
          </h1>
          <p id="splash-description" className="mt-5 max-w-sm text-md leading-7 text-black">
            A curious mind, a little creativity and a lot of heart.
            Welcome to a collection of things I make and moments I love.
          </p>
          {/*<p className="mt-8 font-hand text-xl text-black">Come on in, make yourself at home.</p>*/}
        </div>
        <button
          type="button"
          onClick={enterPortfolio}
          disabled={leaving}
          aria-label="Swipe up or click to enter home"
          className="intro-swipe-cue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
        >
          <svg className="intro-swipe-chevron" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
    </main>
    </>
  );
}
