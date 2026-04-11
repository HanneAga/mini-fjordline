"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!from || !to || !date) {
      setShowValidationPopup(true);
      return;
    }

    const params = new URLSearchParams({
      from: from.trim(),
      to: to.trim(),
      date,
    });

    router.push(`/results?${params.toString()}`);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Mini fjordline</p>
        <h1 className={styles.title}>Hvor vil du reise?</h1>

        <form className={styles.form} onSubmit={handleSearch}>
          <div className={styles.route}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="from">
                <span className={`${styles.dot} ${styles.dotFrom}`} />
                Fra
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="from"
                  name="from"
                  type="text"
                  placeholder="Avreisested"
                  value={from}
                  onChange={(event) => setFrom(event.target.value)}
                />
                <span className={styles.icon}>i</span>
              </div>
            </div>

            <div className={styles.connector}>
              <div className={styles.line} />
              <button
                className={styles.swapButton}
                type="button"
                title="Bytt"
                onClick={handleSwap}
              >
                ↕
              </button>
              <div className={styles.line} />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="to">
                <span className={`${styles.dot} ${styles.dotTo}`} />
                Til
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="to"
                  name="to"
                  type="text"
                  placeholder="Destinasjon"
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                />
                <span className={styles.icon}>⌖</span>
              </div>
            </div>

            <div className={`${styles.field} ${styles.dateField}`}>
              <label className={styles.fieldLabel} htmlFor="date">Dato</label>
              <div className={styles.inputWrap}>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>
          </div>

          <button type="submit" className={styles.searchButton}>
            Søk avganger
            <span className={styles.arrow}>→</span>
          </button>
        </form>
      </section>

      {showValidationPopup && (
        <div className={styles.popupOverlay} role="dialog" aria-modal="true" aria-labelledby="validation-title">
          <div className={styles.popup}>
            <p className={styles.popupEyebrow}>Mini fjordline</p>
            <h2 id="validation-title" className={styles.popupTitle}>Mangler informasjon</h2>
            <p className={styles.popupText}>Fyll ut feltene for fra, til og dato før du søker.</p>
            <button
              type="button"
              className={styles.popupButton}
              onClick={() => setShowValidationPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
