import { useEffect, useState } from 'react';
import { getApiUrl } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl('users'));
        const data = await response.json();
        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data?.results)
              ? data.results
              : [];
        setUsers(normalizedUsers);
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
