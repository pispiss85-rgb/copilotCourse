import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
      const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
      const apiUrl = `${apiBaseUrl}/api/teams/`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const normalizedTeams = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.results)
              ? data.results
              : [];
        setTeams(normalizedTeams);
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
