'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Departure } from '../../../types/departure'
import styles from './page.module.css'

function Results() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')
  const promoActive = searchParams.get('promo') === '1'

  const [departures, setDepartures] = useState<Departure[]>([])
  const [loading, setLoading] = useState(true)

  const handleSelect = (departureId: string) => {
    const params = new URLSearchParams({ id: departureId })
    if (promoActive) {
      params.append('promo', '1')
    }
    router.push(`/summary?${params.toString()}`)
  }

  useEffect(() => {
    const fetchDepartures = async () => {
      const params = new URLSearchParams()
      if (from) params.append('from', from)
      if (to) params.append('to', to)
      if (date) params.append('date', date)
      
      const response = await fetch(`/api/departures?${params.toString()}`)
      const data = await response.json()
      setDepartures(data)
      setLoading(false)
    }

    fetchDepartures()
  }, [from, to, date])

  if (!from || !to || !date) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Avganger</h1>
        <p className={styles.message}>Vennligst gjør et søk først.</p>
        <a className={styles.link} href="/">Gå til søk</a>
      </section>
    </main>
  )
}

  if (loading) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p className={styles.message}>Laster avganger...</p>
        </section>
      </main>
    )
  }

  if (departures.length === 0) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>Avganger</h1>
          <p className={styles.message}>Ingen avganger funnet.</p>
          <a className={styles.link} href="/">Nytt søk</a>
        </section>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
      <header className={styles.header}>
        <h1 className={styles.title}>Avganger</h1>
        <p className={styles.subtitle}>{from} → {to} · {date}</p>
      </header>
      <ul className={styles.list}>
        {departures.map((departure) => (
          <li key={departure.id} className={styles.departureCard}>
            <div className={styles.route}>
              <strong>{departure.from} → {departure.to}</strong>
            </div>
            <div className={styles.times}>
              <span>Avgang: {departure.departureTime}</span>
              <span>Ankomst: {departure.arrivalTime}</span>
            </div>
            <div className={styles.duration}>Varighet: {departure.durationMinutes} minutter</div>
            <div className={styles.bottomRow}>
              <div className={styles.price}>{Math.max(0, departure.price - (promoActive ? 400 : 0))} NOK</div>
              <button className={styles.button} type="button" onClick={() => handleSelect(departure.id)}>
              Velg
            </button>
            </div>
          </li>
        ))}
      </ul>
      </section>
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<main className={styles.page}><section className={styles.card}><p className={styles.message}>Laster avganger...</p></section></main>}>
      <Results />
    </Suspense>
  )
}