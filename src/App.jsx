// src/App.jsx
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { LanguageProvider } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';   // ← νέο import

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import PropertyDetails from '@/pages/PropertyDetails';
import ExploreLesvos from '@/pages/ExploreLesvos';
import AdminDashboard from '@/pages/AdminDashboard';
import BookingPage from '@/pages/BookingPage';
import ResidencesPage from '@/pages/ResidencesPage';

// Simple admin guard component
function AdminRoute() {
  const { isAuthenticated, isLoadingAuth, authChecked } = useAuth();

  if (!authChecked || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  // Αν δεν είναι logged in, redirect στην αρχική
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <AdminDashboard />;
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/explore" element={<ExploreLesvos />} />
              <Route path="/residences" element={<ResidencesPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/admin" element={<AdminRoute />} />   {/* ← προστατευμένο */}
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
        <SonnerToaster position="top-right" richColors />
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App
