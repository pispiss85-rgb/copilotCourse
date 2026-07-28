import { useEffect, useState } from 'react';
import { getApiUrl } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.items ?? []);
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
