'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Departure } from '../../../types/departure'

function Results() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')

  const [departures, setDepartures] = useState<Departure[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <p>Loading...</p>
  }

  if (departures.length === 0) {
    return <p>Ingen avganger funnet.</p>
  }

  return (
    <div>
      <h1>Avganger</h1>
      <ul>
        {departures.map((departure) => (
          <li key={departure.id}>
            <div>
              <strong>{departure.from} → {departure.to}</strong>
            </div>
            <div>Avgang: {departure.departureTime}</div>
            <div>Ankomst: {departure.arrivalTime}</div>
            <div>Varighet: {departure.durationMinutes} minutter</div>
            <div>Pris: {departure.price} NOK</div>
            <button>Velg</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Results />
    </Suspense>
  )
}