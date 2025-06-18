import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Users from './pages/Users';
import Agents from './pages/Agents';
import Subscriptions from './pages/Subscriptions';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Drivers from './pages/Drivers';
import Notifications from './pages/Notifications';
import Ads from './pages/Ads';
import Login from './pages/Login';
import SystemSettings from './pages/SystemSettings';
import Content from './pages/Content';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="schools" element={<Schools />} />
        <Route path="users" element={<Users />} />
        <Route path="agents" element={<Agents />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="ads" element={<Ads />} />
        <Route path="content" element={<Content />} />
        <Route path="system-settings" element={<SystemSettings />} />
      </Route>
    </Routes>
  );
}

export default App;