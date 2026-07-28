import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const apiUrl = 'https://pispiss85-rgb-copilotcourse-8000.app.github.dev/api/leaderboard';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const normalizedEntries = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.results)
              ? data.results
              : [];
        setEntries(normalizedEntries);
      } catch {
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p>Loading leaderboard…</p>;
  }

  return (
    <section>
      <h2>Leaderboard</h2>
      <ol>
        {entries.map((entry) => (
          <li key={entry.id ?? entry._id ?? entry.name}>{entry.name ?? 'Player'} - {entry.points ?? 0} pts</li>
        ))}
      </ol>
    </section>
  );
}
