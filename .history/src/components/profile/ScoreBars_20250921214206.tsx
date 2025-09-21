import * as React from "react";
import styles from "./ScoreBars.module.css";

export type ScoreItem = {
  label: string;
  score: number;      // 0–10
  note?: string;      // short, optional
};

type Props = {
  title: string;
  items: ScoreItem[];
  max?: number;       // default 10
  showScale?: boolean;
  dense?: boolean;    // tighter rows
};

const clamp = (n: number, lo = 0, hi = 10) => Math.max(lo, Math.min(hi, n));

export function ScoreBars({
  title,
  items,
  max = 10,
  showScale = true,
  dense = false,
}: Props) {
  return (
    <section className={styles.root} aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}>
      <header className={styles.header}>
        <h3 id={title.replace(/\s+/g, "-").toLowerCase()} className={styles.title}>
          {title}
        </h3>
        {showScale && <div className={styles.scale}>0&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;10</div>}
      </header>

      <ul className={styles.list} role="list">
        {items.map(({ label, score, note }) => {
          const val = clamp(score, 0, max);
          const pct = (val / max) * 100;
          return (
            <li key={label} className={`${styles.row} ${dense ? styles.dense : ""}`}>
              <div className={styles.labelWrapper}>
                <span className={styles.label}>{label}</span>
                {note && <span className={styles.note}>{note}</span>}
              </div>

              <div
                className={styles.bar}
                role="progressbar"
                aria-label={`${label} score`}
                aria-valuenow={val}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuetext={`${val} out of ${max}`}
              >
                <div className={styles.meter} style={{ width: `${pct}%` }} />
              </div>

              <div className={styles.value}>{val}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ScoreBars;