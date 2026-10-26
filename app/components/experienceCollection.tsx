"use client";

import MiniLanyard, { type Experience } from "./miniLanyard";
import styles from "./experienceCollection.module.css";

export default function ExperienceCollection({ experiences }: { experiences: Experience[] }) {
  return (
    <div className={styles.collection}>
      <div id="experience-lanyards" className={styles.rail} role="region" aria-label="Experience lanyards. Scroll to explore; press Escape to close." tabIndex={0}>
        <ul className={styles.rack}>
          {experiences.map((experience) => (
            <li key={experience.organization} className={styles.slot}>
              <MiniLanyard experience={experience} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
