"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!from || !to || !date) {
      alert("Fyll ut alle felter");
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
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Mini Fjord Line</h1>
        <p>Finn og se avganger for fergereiser langs fjorden på en enkel og oversiktlig måte.</p>
      </div>
      <form className={styles.form} onSubmit={handleSearch}>
        <div className={styles.formGroup}>
          <label htmlFor="from">Avreisested</label>
          <input
            id="from"
            name="from"
            type="text"
            placeholder="F.eks. Bergen"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="to">Destinasjon</label>
          <input
            id="to"
            name="to"
            type="text"
            placeholder="F.eks. Sognefjord"
            value={to}
            onChange={(event) => setTo(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date">Dato</label>
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Søk avganger</button>
      </form>
    </main>
  );
}
