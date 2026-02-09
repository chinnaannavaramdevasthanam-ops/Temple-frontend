import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery";
import Sevas from "./pages/Sevas";
import Bookings from "./pages/Bookings";
import Donations from "./pages/Donations";

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
      <Navbar />

      <div className="container-fluid mt-4">
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/sevas" element={<Sevas />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER */}
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

          {/* ADMIN (NESTED LAYOUT) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
  path="/admin/users"
  element={
    <ProtectedRoute admin>
      <AdminUsers />
    </ProtectedRoute>
  }
/>

            <Route index element={<AdminDashboard />} />
            <Route path="sevas" element={<AdminSevas />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
