# Mini-Fjordline

Dette er en enkel mini bookingapp hvor man kan søke etter ferjeavganger, velge en avgang og se en oppsummering av reisen.

## Hva den gjør

* Lar brukeren søke på avreisested, destinasjon og dato
* Viser en liste med tilgjengelige avganger
* Lar brukeren velge en avgang
* Viser en enkel oppsummering av valgt reise

## Teknologi

Appen er bygget med Next.js (App Router), React og TypeScript.
Det brukes mock-data, så det er ingen database eller ekstern backend.

## Valg jeg tok

Jeg valgte å bruke Next.js route handlers som “backend” i stedet for å lage et separat API.

Jeg har jobbet mye med C#, og vurderte å lage en egen backend, men siden oppgaven kun krevde mock-data føltes det mer riktig å holde alt i én applikasjon. Det gjorde løsningen enklere og raskere å jobbe med.

Jeg har også prøvd å holde state og struktur så enkel som mulig, og fokusere på en tydelig flyt:
søk → resultater → oppsummering.

## Hvis jeg hadde hatt mer tid

* gjort UI litt mer gjennomarbeidet
* lagt til bedre validering og feilhåndtering
* vurdert en ekte backend med database

## Utfordringer

Det mest utfordrende var å få riktig flyt med query params og hvordan Next.js håndterer searchParams i App Router.

Jeg brukte også litt tid på å finne riktig balanse mellom Client og Server Components.

## Kjøre prosjektet


npm install
npm run dev


Åpne http://localhost:3000


