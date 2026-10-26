const INTRO_SEEN_KEY = "lipda:intro-seen";
let seenInMemory = false;

export function hasSeenIntro(): boolean {
  try {
    return seenInMemory || sessionStorage.getItem(INTRO_SEEN_KEY) === "true";
  } catch {
    return seenInMemory;
  }
}

export function markIntroSeen(): void {
  seenInMemory = true;
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "true");
  } catch {
    // Remember navigation within this visit if browser storage is blocked.
  }
}
