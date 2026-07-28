import { useEffect, useState } from 'react'
import './App.css'

type Summary = {
  app: string
  features: string[]
}

function App() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/summary')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load OctoFit summary')
        }
        return response.json() as Promise<Summary>
      })
      .then((data) => setSummary(data))
      .catch(() => setError('Unable to connect to the backend API.'))
  }, [])

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Make fitness fun for every student.</h1>
        <p className="description">
          Track workouts, spark team challenges, and stay motivated with a simple leaderboard.
        </p>
      </section>

      <section className="summary-card">
        <h2>What this app supports</h2>
        {error ? (
          <p className="error">{error}</p>
        ) : summary ? (
          <ul>
            {summary.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p>Loading features…</p>
        )}
      </section>
    </main>
  )
}

export default App
