import MainLanyard from "../components/mainLanyard";
import ExperienceCard from "../components/experienceCard";
import IntroTypedName from "../components/introTypedName";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dotted-paper">
      <div className={styles.layout}>
        <aside className={styles.portrait}>
          <div className={styles.portraitInner}>
            <MainLanyard />
          </div>
        </aside>

        <main className={styles.bio}>
          <div className="mx-auto flex max-w-xl flex-col">
            <p className="text-lg text-zinc-900 dark:text-zinc-100">
              This is
              <span className="font-hand text-5xl tracking-[5.76px] ml-3">
                <IntroTypedName prefix="" />
              </span>
            </p>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                I&apos;m a 2026 UNSW graduate in Bioinformatics Engineering. By day,
                I&apos;m a Management Trainee exploring the world of business
                strategy and product development.
              </p>
              <p>
                I&apos;m passionate about building cool things that make a meaningful
                impact on people&apos;s lives. I also love exploring new corners of
                tech and staying curious, whether it&apos;s developing, designing, or
                diving into research.
              </p>

              <p>
                Outside of tech, I&apos;m a big foodie, an enthusiast of all things
                art, and an unapologetic animal lover (pretty much every kind)
                ;)
              </p>
            </div>
            <ExperienceCard />
          </div>
        </main>
      </div>
    </div>
  );
}
