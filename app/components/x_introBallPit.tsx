"use client";

import { useEffect, useRef } from "react";

export default function IntroBallPit({ onDone }: { onDone: () => void }) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const Matter = await import("matter-js");
      console.log("Matter loaded ✅");

      const { Engine, Render, Runner, World, Bodies, Composite, Body } = Matter;

      const el = sceneRef.current!;
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);

      const engine = Engine.create();
      engine.gravity.y = 1.05;

      const render = Render.create({
        element: el,
        engine,
        options: {
          width: w,
          height: h,
          wireframes: false,
          // ✅ make canvas background match page
          background:
            getComputedStyle(document.documentElement).getPropertyValue(
              "--ballpit-bg"
            ) || "transparent",
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        },
      });
      console.log("Render created ✅ canvas:", render.canvas);

      Matter.Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: w, y: h },
      });

      

      // ✅ Container walls (box)
      const t = 80;
      const left = Bodies.rectangle(-t / 2, h / 2, t, h * 2, {
        isStatic: true,
      });
      const right = Bodies.rectangle(w + t / 2, h / 2, t, h * 2, {
        isStatic: true,
      });
      const ceiling = Bodies.rectangle(w / 2, -t / 2, w * 2, t, {
        isStatic: true,
      });

      // ✅ Floor we remove later
      const floor = Bodies.rectangle(w / 2, h + t / 2, w * 2, t, {
        isStatic: true,
      });

      World.add(engine.world, [left, right, ceiling, floor]);

      const testBall = Bodies.circle(w / 2, h / 2, 80, {
        isStatic: true,
        render: { fillStyle: "rgba(255, 0, 0, 1)" },
      });
      World.add(engine.world, testBall);

      // ✅ Pastel ball colors so you can SEE them on white
      const pastel = () => {
        return "rgba(0, 200, 255, 0.95)";
      };

      const makeBall = () => {
        const r = 46 + Math.random() * 22; // big ball pit vibe
        const x = 50 + Math.random() * (w - 100);
        const y = -40 - Math.random() * 120;

        const ball = Bodies.circle(x, y, r, {
          friction: 0.18,
          frictionAir: 0.01,
          restitution: 0.08, // low bounce => stacks
          render: {
            fillStyle: pastel(),
            strokeStyle: "rgba(0,0,0,0.08)",
            lineWidth: 1,
          },
        });

        Body.setAngularVelocity(ball, (Math.random() - 0.5) * 0.05);
        Body.setVelocity(ball, { x: (Math.random() - 0.5) * 2.5, y: 0 });
        return ball;
      };

      const balls: Matter.Body[] = [];

      Render.run(render);
      console.log("Render running ✅");
      const runner = Runner.create();
      Runner.run(runner, engine);

      const targetCount = Math.max(
        26,
        Math.min(60, Math.floor((w * h) / 38000))
      );
      let spawned = 0;

      const fillInterval = window.setInterval(() => {
        // spawn 3 balls per tick for a quick fill
        for (let i = 0; i < 3; i++) {
          if (spawned >= targetCount) break;
          const b = makeBall();
          balls.push(b);
          World.add(engine.world, b);
          spawned++;
        }

        if (spawned >= targetCount) {
          window.clearInterval(fillInterval);

          // settle, then dump out together
          window.setTimeout(() => {
            World.remove(engine.world, floor);
            engine.gravity.y = 1.35;

            const check = () => {
              if (doneRef.current) return;
              const below = balls.filter((b) => b.position.y > h + 250).length;
              if (below > balls.length * 0.85) {
                doneRef.current = true;
                onDone();
              } else {
                requestAnimationFrame(check);
              }
            };
            requestAnimationFrame(check);
          }, 900); // little longer settle time = better stack
        }
      }, 60);

      cleanup = () => {
        window.clearInterval(fillInterval);
        Render.stop(render);
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);

        if (render.canvas?.parentNode)
          render.canvas.parentNode.removeChild(render.canvas);
        render.textures = {};
      };

      // If you resize, simplest is reload (or we can code a resize handler later)
      const onResize = () => window.location.reload();
      window.addEventListener("resize", onResize);

      const oldCleanup = cleanup;
      cleanup = () => {
        window.removeEventListener("resize", onResize);
        oldCleanup?.();
      };
    })();

    return () => cleanup?.();
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-black">
      <div ref={sceneRef} className="absolute inset-0" />
    </div>
  );
}
