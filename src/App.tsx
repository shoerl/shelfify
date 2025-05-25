import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell';
// import TypesList from './pages/TypesList'; // Removed unused import
// import TypeDetail from './pages/TypeDetail'; // Removed unused import
// import AllItems from './pages/AllItems'; // Removed unused import
import Home from './pages/Home';
import MyShelves from './pages/MyShelves'; // Import the new MyShelves component
import { AllCopies } from './pages/AllCopies'; // Corrected import to directly import AllCopies

// Placeholder components for new pages
const ShelfDetailPlaceholder = () => <div>Shelf Detail Page Placeholder</div>;
const WishlistPlaceholder = () => <div>Wishlist Page Placeholder</div>;
const StatisticsPlaceholder = () => <div>Statistics Page Placeholder</div>;
const ActivityFeedPlaceholder = () => <div>Activity Feed Page Placeholder</div>;

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelves" element={<MyShelves />} /> {/* Use the new MyShelves component */}
        <Route path="/shelves/:shelfId" element={<ShelfDetailPlaceholder />} />
        <Route path="/copies" element={<AllCopies />} /> {/* Use the aliased AllCopies component */}
        <Route path="/wishlist" element={<WishlistPlaceholder />} />
        <Route path="/stats" element={<StatisticsPlaceholder />} />
        <Route path="/activity" element={<ActivityFeedPlaceholder />} />

        {/* Old routes - uncomment or remove as needed */}
        {/* <Route path="/types" element={<TypesList />} /> */}
        {/* <Route path="/types/:typeId" element={<TypeDetail />} /> */}
      </Routes>
    </AppShell>
  );
}
