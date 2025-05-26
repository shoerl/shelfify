import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell';
import { Helmet } from 'react-helmet-async';
// import TypesList from './pages/TypesList'; // Removed unused import
// import TypeDetail from './pages/TypeDetail'; // Removed unused import
// import AllItems from './pages/AllItems'; // Removed unused import
import Home from './pages/Home';
import MyShelves from './pages/MyShelves'; // Import the new MyShelves component
import { AllCopies } from './pages/AllCopies'; // Corrected import to directly import AllCopies
import { ShelfDetail } from './pages/ShelfDetail'; // Import ShelfDetail
import Wishlist from './pages/Wishlist'; // Import Wishlist
import Statistics from './pages/Statistics'; // Import Statistics
import ActivityFeed from './pages/ActivityFeed'; // Import ActivityFeed

// Placeholder components for new pages
// const ShelfDetailPlaceholder = () => <div>Shelf Detail Page Placeholder</div>; // Remove placeholder
// const WishlistPlaceholder = () => <div>Wishlist Page Placeholder</div>; // Remove placeholder
// const StatisticsPlaceholder = () => <div>Statistics Page Placeholder</div>; // Remove placeholder
// const ActivityFeedPlaceholder = () => <div>Activity Feed Page Placeholder</div>; // Remove placeholder

export default function App() {
  const previewId = import.meta.env.VITE_PREVIEW_ID;

  return (
    <AppShell>
      <Helmet>
        <title>{`Shelfify${previewId ? ' (Preview ' + previewId + ')' : ''}`}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shelves" element={<MyShelves />} />
        <Route path="/shelves/:shelfId" element={<ShelfDetail />} /> {/* Use ShelfDetail component */}
        <Route path="/copies" element={<AllCopies />} />
        <Route path="/wishlist" element={<Wishlist />} /> {/* Use Wishlist component */}
        <Route path="/stats" element={<Statistics />} /> {/* Use Statistics component */}
        <Route path="/activity" element={<ActivityFeed />} /> {/* Use ActivityFeed component */}

        {/* Old routes - uncomment or remove as needed */}
        {/* <Route path="/types" element={<TypesList />} /> */}
        {/* <Route path="/types/:typeId" element={<TypeDetail />} /> */}
      </Routes>
    </AppShell>
  );
}
