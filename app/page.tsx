"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasSeenIntro } from "./lib/intro-session";

// Next.js maps each directory to a route; / only chooses the entry page.
export default function EntryPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(hasSeenIntro() ? "/home" : "/intro");
  }, [router]);

  return (
    <main className="bg-dotted-paper grid min-h-dvh place-items-center">
      <p role="status" className="font-hand text-2xl">Welcome to Lipda’s little corner of the internet...</p>
    </main>
  );
}
