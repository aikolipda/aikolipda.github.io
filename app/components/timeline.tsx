import Image from "next/image";
import { Tags } from "./tags";

type LifeItem = {
  date: string;
  title: string;
  tags?: string[];
  blurb: string;
  image?: string;
};

type Month =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

function dateToKey(s: string): number {
  const [mon, yearStr] = s.split(" ") as [Month, string];
  const year = Number(yearStr);

  const months: Record<Month, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  return year * 100 + months[mon];
}

export function Timeline({ items }: { items: LifeItem[] }) {
    const sorted = [...items].sort(
      (a, b) => dateToKey(b.date) - dateToKey(a.date)
    );
  
    return (
      <div
        className="overflow-x-auto pb-6 snap-x snap-mandatory
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
      <div className="relative flex w-max gap-6 pr-6">
          {/* line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[18px] h-px bg-zinc-200 dark:bg-zinc-800" />
  
          {sorted.map((item, idx) => {
            const prev = sorted[idx - 1];
            const showDate = !prev || prev.date !== item.date;
  
            return (
              <div
                key={`${item.date}-${idx}-${item.title}`}
                className="snap-start shrink-0 w-[5%] sm:w-[300px] md:w-[420px]"
              >
                {/* show date when date changes */}
                {showDate ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  </div>
                ) : (
                  <div className="h-[18px]" />
                )}
  
                <article
                  className="mt-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800
                             bg-white/70 dark:bg-zinc-950/40 backdrop-blur p-5
                             transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  {item.image && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <div className="relative h-44 w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 88vw, 420px"
                        />
                      </div>
                    </div>
                  )}
  
                  <p className="text-sm md:text-md font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                    {item.blurb}
                  </p>
  
                  <Tags tags={item.tags} />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  