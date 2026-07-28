import { useEffect, useState } from 'react';
import { getApiUrl } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));
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
