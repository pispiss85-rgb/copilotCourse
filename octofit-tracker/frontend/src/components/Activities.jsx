import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.items ?? []);
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
