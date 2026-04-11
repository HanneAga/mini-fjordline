"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const weekdayLabels = ["Man", "Tir", "Ons", "Tor", "Fre", "Lor", "Son"];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildCalendarDays(monthStart: Date) {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

  return Array.from({ length: 42 }, (_, index) => {
    const dayDate = new Date(year, month, index - startOffset + 1);
    return {
      iso: toIsoDate(dayDate),
      label: dayDate.getDate(),
      inCurrentMonth: dayDate.getMonth() === month,
    };
  });
}

export default function Home() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const monthLabel = new Intl.DateTimeFormat("nb-NO", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const calendarDays = buildCalendarDays(visibleMonth);
  const todayIso = toIsoDate(new Date());
  const dateLabel = date
    ? new Intl.DateTimeFormat("nb-NO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(`${date}T00:00:00`))
    : "dd.mm.åååå";

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handlePreviousMonth = () => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleSelectDate = (selectedDate: string) => {
    setDate(selectedDate);
    setShowCalendar(false);
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
                <svg
                  className={styles.icon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
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
                <svg
                  className={styles.icon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
            </div>

            <div className={`${styles.field} ${styles.dateField}`}>
              <label className={styles.fieldLabel} htmlFor="date-trigger">Dato</label>
              <div className={styles.inputWrap}>
                <button
                  id="date-trigger"
                  type="button"
                  className={styles.dateTrigger}
                  aria-expanded={showCalendar}
                  onClick={() => setShowCalendar((open) => !open)}
                >
                  <span>{dateLabel}</span>
                  <svg
                    className={styles.calendarIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </button>

                {showCalendar && (
                  <div className={styles.calendarPopover} role="dialog" aria-label="Velg dato">
                    <div className={styles.calendarHeader}>
                      <button
                        type="button"
                        className={styles.monthButton}
                        onClick={handlePreviousMonth}
                        aria-label="Forrige måned"
                      >
                        ←
                      </button>
                      <p className={styles.monthTitle}>{monthLabel}</p>
                      <button
                        type="button"
                        className={styles.monthButton}
                        onClick={handleNextMonth}
                        aria-label="Neste måned"
                      >
                        →
                      </button>
                    </div>

                    <div className={styles.weekdays}>
                      {weekdayLabels.map((weekday) => (
                        <span key={weekday}>{weekday}</span>
                      ))}
                    </div>

                    <div className={styles.calendarGrid}>
                      {calendarDays.map((day) => {
                        const isSelected = day.iso === date;
                        const isToday = day.iso === todayIso;

                        return (
                          <button
                            key={day.iso}
                            type="button"
                            className={`${styles.dayButton} ${
                              day.inCurrentMonth ? "" : styles.dayMuted
                            } ${isSelected ? styles.daySelected : ""} ${
                              isToday ? styles.dayToday : ""
                            }`}
                            onClick={() => handleSelectDate(day.iso)}
                          >
                            {day.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
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
