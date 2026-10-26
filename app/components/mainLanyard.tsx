"use client";

import Image from "next/image";
import LanyardFrame from "./lanyardFrame";
import styles from "./lanyardCard.module.css";

export default function MainLanyard() {
  return (
    <LanyardFrame
      variant="main"
      label="Lipda's portfolio pass"
      backLabel="Photo side"
      front={(flipped) => (
        <>
          <span className={`${styles.art} font-hand`} aria-hidden="true">LC.</span>
          <span className={`${styles.name} font-hand`}>Lipda</span>
          <span className={styles.role}>OWNER | ALL ACCESS</span>
          <span className={styles.contacts}>
            <a href="mailto:chanlipda@gmail.com" tabIndex={flipped ? -1 : 0}>Email ↗</a>
            <a href="https://www.linkedin.com/in/aikolipda" target="_blank" rel="noreferrer" tabIndex={flipped ? -1 : 0}>LinkedIn ↗</a>
          </span>
          <span className={styles.bottom}><span className={styles.bars} aria-hidden="true" /><span>2026</span></span>
        </>
      )}
      back={
        <span className={styles.photo}>
          <Image src="/images/about/meInViennaaa.jpeg" alt="Lipda in Vienna" fill unoptimized draggable={false} className={styles.photoImage} />
        </span>
      }
    />
  );
}
