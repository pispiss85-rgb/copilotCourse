import { useEffect, useState } from 'react';
import { getApiUrl } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams'));
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.items ?? []);
      } catch {
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return <p>Loading teams…</p>;
  }

  return (
    <section>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id ?? team._id ?? team.name}>{team.name ?? 'Team'} - {team.score ?? 0} pts</li>
        ))}
      </ul>
    </section>
  );
}
