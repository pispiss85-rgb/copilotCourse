import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.items ?? []);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading users…</p>;
  }

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id ?? user._id ?? user.email}>{user.name ?? user.email ?? 'Anonymous user'}</li>
        ))}
      </ul>
    </section>
  );
}
