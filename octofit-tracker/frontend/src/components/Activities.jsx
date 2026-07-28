import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      const apiUrl = 'https://pispiss85-rgb-copilotcourse-8000.app.github.dev/api/activities';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const normalizedActivities = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.results)
              ? data.results
              : [];
        setActivities(normalizedActivities);
      } catch {
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return <p>Loading activities…</p>;
  }

  return (
    <section>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id ?? activity._id ?? activity.type}>{activity.type ?? 'Activity'} - {activity.points ?? 0} pts</li>
        ))}
      </ul>
    </section>
  );
}
