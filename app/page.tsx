import Image from "next/image";
import Link from "next/link";
import Button from "./components/button";
import { Timeline } from "./components/timeline";
import { DraggableDeco } from "./components/draggable";

const featured = [
  {
    title: "Mending Broken Heart",
    role: "Software Engineer",
    description:
      "Engineering the next generation of total artificial hearts. The project focuses on innovative cardiac technologies to support patients with end-stage heart failure and improve long-term outcomes.",
    icon: "🫀",
    href: "/projects#p1",
    gradient: "from-rose-400 via-pink-400 to-red-400",
  },
  {
    title: "ZeroDash",
    role: "Software/Computational Biology Intern",
    description:
      "A platform for analysing and visualising cancer genome data. Designed to support precision medicine by enabling earlier diagnoses and more personalised treatments for paediatric patients.",
    icon: "🧬",
    href: "/projects#p2",
    gradient: "from-sky-400 via-cyan-400 to-emerald-400",
  },
  {
    title: "Dynamic Consent Platform",
    role: "Student Engineer",
    description:
      "A digital consent management system that empowers research participants to manage their involvement, update preferences, and securely replace traditional paper-based consent records.",
    icon: "📝",
    href: "/projects#p3",
    gradient: "from-amber-300 via-orange-400 to-rose-400",
  },
  {
    title: "Galaxa",
    role: "Co-founder",
    description:
      "A discovery platform designed to encourage exploration of new places and hidden gems, helping people find and share meaningful travel experiences.",
    icon: "🌟",
    href: "/projects#p7",
    gradient: "from-violet-400 via-fuchsia-400 to-sky-400",
  },
];

const life = [
  {
    date: "Dec 2025",
    title: "We Won the Heart Hackathon 2025, Vienna!",
    tags: ["UNSW", "MBH", "Hackathon"],
    blurb:
      "What a magical night in Vienna! Immensely proud and grateful of our team. Built with a lot of heart, both real and artificial, powered by our undulation pump ❤️.",
    image: "/images/projects/mbh/IMG_7646.jpeg",
  },
  {
    date: "Dec 2025",
    title: "On Stage at Heart Hackathon Finals",
    tags: ["MBH", "Public Speaking"],
    blurb:
      "Spoke on behalf of the MBH software team at the Heart Hackathon Finals stage in Vienna, sharing our work and journey.",
    image: "/images/projects/mbh/IMG_9347 2.jpeg",
  },
  {
    date: "Nov 2025",
    title: "Wrapping Up My BINFSOC Era",
    tags: ["MBH", "Public Speaking"],
    blurb:
      "Closed the chapter on my role as General Secretary of the Bioinformatics Society. 2 years of working with truly brilliant BINFERS.",
    image: "/images/projects/BINFSOC/IMG_8927.JPG",
  },
  {
    date: "Sep 2025",
    title: "Entering Honours Mode at CCI",
    tags: ["Cancer Research", "Honours"],
    blurb:
      "Back at the Children's Cancer Institute, this time as an honours student with the wonderful Piyush Mundra to work on the Joint Modelling Genomics and Transcriptomics to Infer Tumour Heterogeneity Using Single Cell RNA-seq Data.",
  },
  {
    date: "Apr 2025",
    title: "1 Year Anniversary at UNSW College",
    tags: ["Teaching", "UNSW College", "MS Office", "Python"],
    blurb:
      "Hit one year as Computing Teacher at UNSW College. It has been an incredible year working here. Give tutorial and also a lecture.",
    image: "/images/projects/college/IMG_4087.jpeg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black px-6">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16">
        {/* Intro */}
        <section className="relative my-40 flex flex-1 flex-col items-center justify-center text-center">
          <DraggableDeco
            position="-top-30 sm:-top-30 md:-top-40 right-0 md:-right-5"
            size="w-[110px] sm:w-[130px] md:w-[160px]"
            rotation={-12}
            image="/images/deco/IMG_9588.png"
          />

          <p className="text-sm sm:text-md md:text-lg mb-4 text-zinc-700 dark:text-zinc-300">
            Dear visitors, I’m Lipda, a bioinformatics engineering student at
            UNSW, and
          </p>

          <h1 className="font-hand text-3xl sm:text-4xl md:text-5xl tracking-[5.76px] text-zinc-900 dark:text-zinc-100">
            Welcome to my slice of the web :)
          </h1>
          <p className="text-sm sm:text-md md:text-lg mt-4 text-zinc-700 dark:text-zinc-300">
            where I collect what I make
          </p>
          <p className="my-5 text-xs sm:text-sm md:text-md">P.S. my dogs like to wander — try dragging them 🐾</p>
        </section>

        {/* Features */}
        <section className="pb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Featured Projects
          </h2>

          <div className="my-6 sm:my-8 md:my-10 grid grid-cols-2 gap-10 sm:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group relative flex flex-col items-center text-center"
              >
                {/* circle */}
                <div
                  className={[
                    "relative h-22 w-22 sm:h-26 sm:w-26 md:h-30 md:w-30 rounded-full",
                    "transition-transform duration-300 ease-out group-hover:scale-[1.2]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute inset-0 rounded-full bg-gradient-to-br opacity-30 shadow-[0_12px_30px_rgba(0,0,0,0.10)]",
                      "group-hover:opacity-55",
                      p.gradient,
                    ].join(" ")}
                  />
                  <div className="absolute inset-0 rounded-full bg-white/25 dark:bg-zinc-900/25 backdrop-blur-sm shadow-inner" />

                  <div className="relative grid h-full w-full place-items-center">
                    <span className="text-3xl md:text-4xl leading-none drop-shadow-sm group-hover:scale-[1.2]">
                      {p.icon}
                    </span>
                  </div>
                </div>

                {/* title */}
                <p
                  className={[
                    "mt-5 text-sm md:text-md text-zinc-800 dark:text-zinc-200 transition-all duration-200 transition-all duration-200",
                    "group-hover:font-bold group-hover:text-md group-hover:md:text-lg",
                  ].join(" ")}
                >
                  {p.title}
                </p>

                {/* role + description*/}
                <div
                  className={[
                    "max-w-[16rem] text-xs md:text-sm text-zinc-600 dark:text-zinc-400 grid-rows-[0fr] opacity-0 ",
                    "grid transition-[grid-template-rows,opacity,transform] duration-300 ease-out -translate-y-1",
                    "group-hover:opacity-100 group-hover:translate-y-0 group-hover:grid-rows-[1fr]",
                  ].join(" ")}
                >
                  <div className="min-h-0 overflow-hidden space-y-1">
                    <div className="flex justify-center">
                      <span
                        className={[
                          "inline-flex items-center gap-2 rounded-full px-3 py-1 my-2",
                          "text-[10px] md:text-[11px] font-medium tracking-wide text-zinc-700 dark:text-zinc-200",
                          "bg-zinc-100/80 dark:bg-zinc-900/50 backdrop-blur",
                        ].join(" ")}
                      >
                        <span className="opacity-60">✦</span>
                        {p.role}
                      </span>
                    </div>
                    <p>{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Button href="/projects">View All Projects</Button>
          </div>
        </section>

        {/* Life update */}
        <section className="pt-10">
          <div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-lg md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                Life Recently
              </h2>
              <p className="hidden sm:block text-sm text-zinc-500 dark:text-zinc-400">
                swipe →
              </p>
            </div>
          </div>
          <div className="my-6 sm:my-8">
            <Timeline items={life} />
          </div>
        </section>

        {/* Sign off */}
        <section className="relative mt-12 mb-20 text-sm sm:text-md md:text-lg text-center text-neutral-600">

          <p className="mb-2">
            Designed in Figma and built with React + Tailwind 💻
          </p>
          <p className="mb-6">
            Made with curiosity, sugar, and a lot of care 🍬 💖
          </p>

          <p className="mb-3 text-neutral-500">Warmly,</p>
          <p className="font-hand text-3xl sm:text-4xl md:text-5xl tracking-[0.12em] text-neutral-800">
            Lipda
          </p>
          <DraggableDeco
            position="-bottom-10 sm:-bottom-5 md:-bottom-5 left-0 sm:left-10 md:left-0"
            size="w-[100px] sm:w-[110px] md:w-[170px]"
            rotation={30}
            image="/images/deco/IMG_6335.png"
          />
          
        </section>
      </main>
    </div>
  );
}
