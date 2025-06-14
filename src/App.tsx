import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Services from './pages/Services';
import Offers from './pages/Offers';
import Plans from './pages/Plans';
import Contact from './pages/Contact';
import CustomerLogin from './pages/CustomerLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RedeemForm from './pages/RedeemForm';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Public: Only for non-authenticated users */}
                  <Route
                    path="/customer-login"
                    element={
                      <PublicRoute>
                        <CustomerLogin />
                      </PublicRoute>
                    }
                  />

                  {/* Protected: Only for authenticated users */}
                  <Route
                    path="/customer-dashboard"
                    element={
                      <ProtectedRoute>
                        <CustomerDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Pages (You can protect these later if needed) */}
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/redeem" element={<RedeemForm />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
