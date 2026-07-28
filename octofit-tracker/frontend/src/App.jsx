import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <section className="hero-card">
      <p className="eyebrow">OctoFit Tracker</p>
      <h1>Fitness tracking for the modern school community.</h1>
      <p className="description">
        Explore users, activities, teams, workouts, and the leaderboard from a single dashboard.
      </p>
      <p className="description">
        {codespaceName
          ? `API requests target the Codespaces endpoint for ${codespaceName}.`
          : 'Define VITE_CODESPACE_NAME in .env.local to target your Codespaces API URL.'}
      </p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="nav-bar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
