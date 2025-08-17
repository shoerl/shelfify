import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell';
import { Helmet } from 'react-helmet-async';
import { ModalProvider } from './context/ModalContext';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import AddItem from './pages/AddItem';

export default function App() {
  const previewId = import.meta.env.VITE_PREVIEW_ID;

  return (
    <ModalProvider>
      <AppShell>
        <Helmet>
          <title>{`Shelfify${previewId ? ' (Preview ' + previewId + ')' : ''}`}</title>
        </Helmet>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/items/:itemId" element={<ItemDetail />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </AppShell>
    </ModalProvider>
  );
}
