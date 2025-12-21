import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  href,
  children,
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm bg-zinc-100/70 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-white/45 dark:hover:bg-white/5 hover:font-semibold shadow-inner backdrop-blur-sm transition-all",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
