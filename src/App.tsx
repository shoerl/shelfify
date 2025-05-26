import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell';
import { Helmet } from 'react-helmet-async';
// import TypesList from './pages/TypesList'; // Removed unused import
// import TypeDetail from './pages/TypeDetail'; // Removed unused import
// import AllItems from './pages/AllItems'; // Removed unused import
import Home from './pages/Home';
import MyShelves from './pages/MyShelves';
import { AllCopies } from './pages/AllCopies';
import { ModalProvider } from './context/ModalContext';

// Import actual components rather than using placeholders
import { ShelfDetail } from './pages/ShelfDetail';
import Wishlist from './pages/Wishlist';
import Statistics from './pages/Statistics';
import ActivityFeed from './pages/ActivityFeed';

export default function App() {
  const previewId = import.meta.env.VITE_PREVIEW_ID;

  return (
    <ModalProvider>
      <AppShell>
        <Helmet>
          <title>{`Shelfify${previewId ? ' (Preview ' + previewId + ')' : ''}`}</title>
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shelves" element={<MyShelves />} />
          <Route path="/shelves/:shelfId" element={<ShelfDetail />} />
          <Route path="/copies" element={<AllCopies />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/activity" element={<ActivityFeed />} />
          
          {/* Old routes - uncomment or remove as needed */}
          {/* <Route path="/types" element={<TypesList />} /> */}
          {/* <Route path="/types/:typeId" element={<TypeDetail />} /> */}
        </Routes>
      </AppShell>
    </ModalProvider>
  );
}
