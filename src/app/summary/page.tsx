import { departures } from '../../../data/departures'
import styles from './page.module.css'

type SummaryPageProps = {
  searchParams: Promise<{ id?: string }>
}

export default async function SummaryPage({ searchParams }: SummaryPageProps) {
  const params = await searchParams
  const id = params?.id

  if (!id) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Oppsummering</h1>
          <p className={styles.message}>Ingen avgang valgt.</p>
          <a className={styles.link} href="/">Gå tilbake</a>
        </section>
      </main>
    )
  }

  const departure = departures.find((item) => item.id === id)

  if (!departure) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Oppsummering</h1>
          <p className={styles.message}>Avgang ikke funnet.</p>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
      <h1 className={styles.title}>Reiseoppsummering</h1>
      <p className={styles.route}>
        <strong>{departure.from}</strong> → <strong>{departure.to}</strong>
      </p>
      <div className={styles.details}>
        <p><span>Dato:</span> {departure.date}</p>
        <p><span>Avgang:</span> {departure.departureTime}</p>
        <p><span>Ankomst:</span> {departure.arrivalTime}</p>
        <p><span>Varighet:</span> {departure.durationMinutes} minutter</p>
      </div>
      <p className={styles.price}>Pris: {departure.price} NOK</p>
      <a className={styles.link} href="/">Nytt søk</a>
      </section>
    </main>
  )
}