import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { LanguageProvider } from '@/lib/LanguageContext';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import PropertyDetails from '@/pages/PropertyDetails';
import ExploreLesvos from '@/pages/ExploreLesvos';
import AdminDashboard from '@/pages/AdminDashboard';
import BookingPage from '@/pages/BookingPage';
import ResidencesPage from '@/pages/ResidencesPage';
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
              <Route path="/book" element={<BookingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
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
