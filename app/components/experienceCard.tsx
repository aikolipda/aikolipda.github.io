"use client";

import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import Button from "./button";
import ExperienceCollection from "./experienceCollection";

const experiences = [
  {
    organization: "CPF",
    logo: "/images/about/logo/CPF_logo.svg.webp",
    year: "2026-∞",
    color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
    roles: ["Management Trainee · 2026-Present"],
  },
  {
    organization: "UNSW Bionic Heart",
    logo: "/images/about/logo/UBH_logo.png",
    year: "2025-26",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
    roles: ["Software Lead · 2026", "Software Engineer · 2025"],
  },
  {
    organization: "Children’s Cancer Institute",
    logo: "/images/about/logo/CCI_logo.png",
    year: "2024-26",
    color: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
    roles: ["Honours Researcher · 2025-2026", "Software Intern · 2024–2025"],
  },
  {
    organization: "UNSW College",
    logo: "/images/about/logo/UNSW_logo.png",
    year: "2024-26",
    color:
      "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
    roles: ["Computing Teacher · 2024-2026"],
  },
  {
    organization: "CSIRO",
    logo: "/images/about/logo/CSIRO_logo.svg.webp",
    year: "2024",
    color: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
    roles: ["Student Engineer · 2024"],
  },
  {
    organization: "Mahidol University Biomedical and Data Lab",
    logo: "/images/about/logo/Mahidol_U_logo.svg.webp",
    year: "2023",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200",
    roles: ["Intern · 2023"],
  },
];

export default function ExperienceCard() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const openExperience = () => {
    setCollectionOpen(true);
    dialogRef.current?.showModal();
  };

  return (
    <section
      aria-labelledby="experience-title"
      className="mt-9 rounded-[1rem] border border-zinc-200 bg-white/85 px-5 py-4 shadow-sm sm:px-7 dark:border-zinc-800 dark:bg-zinc-950/85"
    >
      <div className="mb-3 flex overflow-x-auto px-2 py-1">
        {experiences.slice(0, 3).map((experience, index) => (
          <Fragment key={experience.organization}>
            {index > 0 && (
              <div className="flex h-14 min-w-4 flex-1 items-center justify-center text-zinc-400 dark:text-zinc-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <path d="m15 6-6 6 6 6" />
                </svg>
              </div>
            )}
            <div className="relative flex shrink-0 flex-col items-center gap-1">
              <span
                className={`relative flex h-14 w-12 sm:w-14 items-center justify-center rounded-2xl border border-zinc-100 bg-white p-2 shadow-sm ${index === 0 ? "experience-current" : ""}`}
              >
                <Image
                  src={experience.logo}
                  alt={experience.organization}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {experience.year}
              </span>
            </div>
          </Fragment>
        ))}
        <div
          aria-hidden="true"
          className="flex h-14 min-w-4 flex-1 items-center justify-center text-zinc-400 dark:text-zinc-500"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
        </div>
        <button
          type="button"
          onClick={openExperience}
          className="flex h-14 w-12 shrink-0 items-center justify-center self-start rounded-2xl border border-dashed border-zinc-300 bg-zinc-100/70 text-2xl font-medium text-zinc-700 shadow-inner backdrop-blur-sm transition-colors duration-200 hover:bg-white/45 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white sm:w-14"
        >
          <span aria-hidden="true">…</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <h2
          id="experience-title"
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Experience
        </h2>
        <Button onClick={openExperience}>View all</Button>
      </div>
      <dialog
        ref={dialogRef}
        id="experience-dialog"
        aria-label="Experience"
        className="experience-dialog"
        onClose={() => setCollectionOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            dialogRef.current?.close();
        }}
      >
        {collectionOpen && <ExperienceCollection experiences={experiences} />}
      </dialog>
    </section>
  );
}
