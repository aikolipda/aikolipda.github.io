"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  /*{ href: "/contact", label: "Contact" },*/
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[min(48rem,calc(100%-2rem))]">
      <div
        className="
          flex items-center justify-between
          rounded-full
          bg-white/30 dark:bg-zinc-900/30
          backdrop-blur-sm
          shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          ring-1 ring-white/50 dark:ring-white/20
          p-2
					gap-2
        "
      >
        {items.map(({ href, label }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`
                flex-1 text-center px-5 py-3 rounded-full text-sm font-medium transition-all
                ${
									active
										? "bg-zinc-100/70 dark:bg-zinc-800/90 text-blue-500 font-semibold shadow-inner ring-1 ring-white/70 dark:ring-white/10"
										: "text-zinc-700 dark:text-zinc-300 font-medium hover:bg-white/45 dark:hover:bg-white/5 hover:font-bold"
                }
              `}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
