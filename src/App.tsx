import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Services from './pages/Services';
// import Offers from './pages/Offers';
import Plans from './pages/Plans';
import Contact from './pages/Contact';
import CustomerLogin from './pages/CustomerLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RedeemForm from './pages/RedeemForm';
import './App.css';

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* ✅ If logged in, redirect from / to dashboard */}
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Navigate to="/customer-dashboard" replace />
            : <Homepage />
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      {/* <Route path="/offers" element={<Offers />} /> */}
      <Route path="/plans" element={<Plans />} />
      <Route path="/contact" element={<Contact />} />

      {/* ✅ Show login only if NOT authenticated */}
      <Route
        path="/customer-login"
        element={
          isAuthenticated
            ? <Navigate to="/customer-dashboard" replace />
            : <CustomerLogin />
        }
      />

      {/* ✅ Protect dashboard */}
      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/redeem" element={<RedeemForm />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <Router>
            <Navbar />
            <main className="main-content">
              <AppRoutes />
            </main>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
