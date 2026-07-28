import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.items ?? []);
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
