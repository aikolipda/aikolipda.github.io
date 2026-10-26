import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & (
  | { href: string }
  | ({ href?: never } & ComponentPropsWithoutRef<"button">)
);

export default function Button(props: ButtonProps) {
  const className = [
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm bg-zinc-100/70 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-white/45 dark:hover:bg-white/5 hover:font-semibold shadow-inner backdrop-blur-sm transition-all",
    props.className ?? "",
  ].join(" ");

  if (props.href !== undefined) {
    return <Link href={props.href} className={className}>{props.children}</Link>;
  }

  const { children, type = "button", ...buttonProps } = props;
  return <button {...buttonProps} type={type} className={className}>{children}</button>;
}
