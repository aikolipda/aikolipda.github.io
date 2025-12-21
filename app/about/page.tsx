import Image from "next/image";
import Link from "next/link";
import { DraggableDeco } from "../components/draggable";

export default function AboutPage() {
  return (
    <div className="h-screen bg-white dark:bg-black">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16">
        <aside className="hidden md:block">
          <div className="sticky top-16 h-[calc(100vh-8rem)] flex items-center justify-center">
            <div className="grid aspect-square w-full max-w-xl grid-cols-2 gap-5">
              <div className="grid h-full grid-rows-2 gap-5">
                <div className="relative h-full overflow-hidden rounded-3xl">
                  <Image
                    src="/images/about/alvi.jpg"
                    alt="Me 1"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="relative h-full overflow-hidden rounded-3xl">
                  <Image
                    src="/images/about/balletTree.jpg"
                    alt="Me 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: top short + tall */}
              <div className="grid h-full grid-rows-3 gap-5">
                <div className="relative h-full overflow-hidden rounded-3xl">
                  <Image
                    src="/images/about/me1.jpg"
                    alt="Me 3"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative row-span-2 h-full overflow-hidden rounded-3xl">
                  <Image
                    src="/images/about/doggie.jpg"
                    alt="Me 4"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="h-[calc(100vh-8rem)] overflow-y-auto">
          <DraggableDeco
            position="top-15 sm:top-20 md:top-10 right-5 sm:right-20 md:right-15"
            size="w-[70px] sm:w-[90px] md:w-[110px]"
            rotation={-12}
            image="/images/logo/icon.png"
          />
          <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center">
            <p className="text-lg text-zinc-900 dark:text-zinc-100">
              This is
              <span className="font-hand text-5xl tracking-[5.76px] ml-3">
                Lipda
              </span>
            </p>

            <div className="mt-6 space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                a 4th-year Bioinformatics student at UNSW, based in Sydney,
                Australia. I’m passionate about building cool things that make a
                meaningful impact on people’s lives. I also love exploring new
                corners of tech and staying curious, whether it’s developing,
                designing, or diving into research.
              </p>

              <p>
                Outside of tech, I’m a big foodie, an enthusiast of all things
                art, and an unapologetic animal lover (pretty much every kind)
                ;)
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6 text-lg">
              <Link
                className="underline underline-offset-4 text-zinc-900 dark:text-zinc-100"
                href="mailto:aikolipda@gmail.com"
              >
                Email
              </Link>
              <span className="text-zinc-400">|</span>
              <Link
                className="underline underline-offset-4 text-zinc-900 dark:text-zinc-100"
                href="https://www.linkedin.com/in/your-handle"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
