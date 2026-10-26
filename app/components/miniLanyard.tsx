"use client";

import Image from "next/image";
import LanyardFrame from "./lanyardFrame";
import styles from "./lanyardCard.module.css";
import colors from "./miniLanyard.module.css";

export type Experience = {
  organization: string;
  logo: string;
  year: string;
  roles?: string[];
};

const themes: Record<string, string> = {
  CPF: colors.green,
  CSIRO: colors.cyan,
  "UNSW Bionic Heart": colors.red,
  "Children’s Cancer Institute": colors.mint,
  "UNSW College": colors.yellow,
  "Mahidol University Biomedical and Data Lab": colors.blue,
};

export default function MiniLanyard({ experience }: { experience: Experience }) {
  return (
    <LanyardFrame
      variant="mini"
      className={themes[experience.organization]}
      label={`${experience.organization} experience pass`}
      backLabel="Logo side"
      front={() => (
        <>
          <span className={`${styles.organization} font-hand`}>{experience.organization}</span>
          <span className={styles.experienceRoles}>
            {(experience.roles ?? []).map((role) => {
              const [title, dates] = role.split(" · ");
              return <span key={role}>{title}<span className={styles.dates}>{dates}</span></span>;
            })}
          </span>
          <span className={styles.bottom}><span className={styles.bars} aria-hidden="true" /><span>{experience.year}</span></span>
        </>
      )}
      back={
        <span className={`${styles.photo} ${styles.logoHolder}`}>
          <Image src={experience.logo} alt={`${experience.organization} logo`} width={256} height={256} sizes="150px" draggable={false} className={styles.logoImage} />
        </span>
      }
    />
  );
}
