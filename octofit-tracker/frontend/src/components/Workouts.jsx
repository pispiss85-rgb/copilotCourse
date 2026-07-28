import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
      const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
      const apiUrl = `${apiBaseUrl}/api/workouts/`;
      const fallbackEndpoint = 'https://your-codespace-name-8000.app.github.dev/api/workouts/';
      const resolvedUrl = apiUrl || fallbackEndpoint;

      try {
        const response = await fetch(resolvedUrl);
        const data = await response.json();
        const normalizedWorkouts = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.results)
              ? data.results
              : [];
        setWorkouts(normalizedWorkouts);
      } catch {
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <p>Loading workouts…</p>;
  }

  return (
    <section>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id ?? workout._id ?? workout.title}>{workout.title ?? 'Workout'} - {workout.difficulty ?? 'unknown'}</li>
        ))}
      </ul>
    </section>
  );
}
