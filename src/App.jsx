import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery";
import Sevas from "./pages/Sevas";
import Bookings from "./pages/Bookings";
import Donations from "./pages/Donations";
import TempleHistory from "./pages/TempleHistory";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSevas from "./pages/admin/AdminSevas";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminUsers from "./pages/admin/AdminUsers";

import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>

      {/* 🔥 SCROLL RESET HANDLER */}
      <ScrollToTop />

      <div className="app-wrapper">
        <Navbar />

        <div className="main-content">
          <Routes>

            {/* ================= PUBLIC ROUTES ================= */}
            <Route path="/" element={<Home />} />
            <Route path="/sevas" element={<Sevas />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<TempleHistory />} />

            {/* ================= USER PROTECTED ROUTES ================= */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/donate"
              element={
                <ProtectedRoute>
                  <Donations />
                </ProtectedRoute>
              }
            />

            {/* ================= ADMIN ROUTES ================= */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute admin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="sevas" element={<AdminSevas />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="bookings" element={<AdminBookings />} />
            </Route>

          </Routes>
        </div>

        <Footer />
      </div>

    </BrowserRouter>
  );
}

export default App;
