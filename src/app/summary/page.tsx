import { departures } from '../../../data/departures'

type SummaryPageProps = {
  searchParams: { id?: string }
}

export default function SummaryPage({ searchParams }: SummaryPageProps) {
  const id = searchParams?.id

  if (!id) {
    return (
      <main>
        <h1>Oppsummering</h1>
        <p>Ingen avgang valgt.</p>
      </main>
    )
  }

  const departure = departures.find((item) => item.id === id)

  if (!departure) {
    return (
      <main>
        <h1>Oppsummering</h1>
        <p>Avgang ikke funnet.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Reiseoppsummering</h1>
      <p>
        <strong>{departure.from}</strong> → <strong>{departure.to}</strong>
      </p>
      <p>Dato: {departure.date}</p>
      <p>Avgang: {departure.departureTime}</p>
      <p>Ankomst: {departure.arrivalTime}</p>
      <p>Varighet: {departure.durationMinutes} minutter</p>
      <p>Pris: {departure.price} NOK</p>
    </main>
  )
}
