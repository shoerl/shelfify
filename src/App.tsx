import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell';
import Home from './pages/Home';
import MyShelves from './pages/MyShelves';
import ShelfDetail from './pages/ShelfDetail';
import AllCopies from './pages/AllCopies';
import Wishlist from './pages/Wishlist';
import Statistics from './pages/Statistics';
import ActivityFeed from './pages/ActivityFeed';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelves" element={<MyShelves />} />
        <Route path="/shelves/:shelfId" element={<ShelfDetail />} />
        <Route path="/copies" element={<AllCopies />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/activity" element={<ActivityFeed />} />
        
        {/* Placeholder routes from AppShell user menu */}
        <Route path="/proposals" element={<div>Your Proposals Page</div>} />
        <Route path="/profile-settings" element={<div>Profile & Settings Page</div>} />
      </Routes>
    </AppShell>
  );
}
