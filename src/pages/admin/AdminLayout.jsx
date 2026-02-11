import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <aside
        className="bg-dark text-white p-3"
        style={{ width: "240px" }}
      >
        <h5 className="mb-4">🛕 Admin Panel</h5>

        <ul className="nav flex-column gap-2">
          <li>
            <Link className="nav-link text-white" to="/admin">
              Dashboard
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/admin/sevas">
              Sevas
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/admin/gallery">
              Gallery
            </Link>
          </li>

          <li>
            <Link className="nav-link text-white" to="/admin/bookings">
              Bookings
            </Link>
          </li>

          <li className="mt-3">
            <button
              className="btn btn-outline-light w-100"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow-1">

        {/* TOP BAR */}
        <div className="border-bottom p-3 bg-light">
          <h5 className="m-0">Sri Satyanarayana Swamy Temple – Admin</h5>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
