import { Departure } from '../types/departure'

export const departures: Departure[] = [
  {
    id: 'bergen-stavanger-20260501-0700',
    from: 'Bergen',
    to: 'Stavanger',
    date: '2026-05-01',
    departureTime: '07:00',
    arrivalTime: '12:00',
    durationMinutes: 300,
    price: 499,
  },
  {
    id: 'bergen-stavanger-20260501-1300',
    from: 'Bergen',
    to: 'Stavanger',
    date: '2026-05-01',
    departureTime: '13:00',
    arrivalTime: '18:00',
    durationMinutes: 300,
    price: 549,
  },
  {
    id: 'bergen-hirtshals-20260502-0900',
    from: 'Bergen',
    to: 'Hirtshals',
    date: '2026-05-02',
    departureTime: '09:00',
    arrivalTime: '21:30',
    durationMinutes: 750,
    price: 1299,
  },
  {
    id: 'bergen-hirtshals-20260502-1900',
    from: 'Bergen',
    to: 'Hirtshals',
    date: '2026-05-02',
    departureTime: '19:00',
    arrivalTime: '07:30',
    durationMinutes: 750,
    price: 1349,
  },
   {
    id: 'bergen-hirtshals-20260503-1900',
    from: 'Bergen',
    to: 'Hirtshals',
    date: '2026-05-03',
    departureTime: '20:00',
    arrivalTime: '08:30',
    durationMinutes: 750,
    price: 1349,
  }
]
