"use client";

import { useEffect, useState } from "react";

const english = ["L", "Li", "Lip", "Lipd", "Lipda"];
const thai = ["ลิ", "ลิป", "ลิปด", "ลิปดา"];

export default function IntroTypedName({ prefix = "I’m " }: { prefix?: string }) {
  const [name, setName] = useState("");
  const [isThai, setIsThai] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    let language = 0;
    let length = 0;
    let deleting = false;

    function tick() {
      if (motion.matches) return;
      const steps = language === 0 ? english : thai;
      length += deleting ? -1 : 1;
      setIsThai(language === 1);
      setName(length > 0 ? steps[length - 1] : "");

      let delay = deleting ? 100 : language === 0 ? 300 : 400;
      if (!deleting && length === steps.length) {
        deleting = true;
        delay = 2500;
      } else if (deleting && length === 0) {
        deleting = false;
        language = 1 - language;
        delay = 450;
      }
      timer = setTimeout(tick, delay);
    }

    function syncMotion() {
      clearTimeout(timer);
      if (!motion.matches) timer = setTimeout(tick, 500);
    }

    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => {
      clearTimeout(timer);
      motion.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <>
      <span className="sr-only">{prefix}Lipda — <span lang="th">ลิปดา</span></span>
      <span aria-hidden="true" className="intro-typed-heading">
        {prefix}
        <span className="intro-typed-slot">
          <span className="intro-typed-measure">Lipda</span>
          <span className="intro-typed-measure" lang="th">ลิปดา</span>
          <span className="intro-typed-animated" lang={isThai ? "th" : "en"}>
            {name}<span className="intro-typing-caret" />
          </span>
          <span className="intro-typed-static">Lipda</span>
        </span>
      </span>
    </>
  );
}
