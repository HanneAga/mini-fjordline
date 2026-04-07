import { NextRequest, NextResponse } from 'next/server'
import { departures } from '../../../../data/departures'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const date = searchParams.get('date')

  let filteredDepartures = departures

  if (from) {
    filteredDepartures = filteredDepartures.filter(dep => dep.from === from)
  }

  if (to) {
    filteredDepartures = filteredDepartures.filter(dep => dep.to === to)
  }

  if (date) {
    filteredDepartures = filteredDepartures.filter(dep => dep.date === date)
  }

  return NextResponse.json(filteredDepartures)
}