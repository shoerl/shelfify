import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell';
import TypesList from './pages/TypesList';
import TypeDetail from './pages/TypeDetail';
import AllItems from './pages/AllItems';
import Home from './pages/Home';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/types" element={<TypesList />} />
        <Route path="/types/:typeId" element={<TypeDetail />} />
        <Route path="/all-items" element={<AllItems />} />
      </Routes>
    </AppShell>
  );
}
