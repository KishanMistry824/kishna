import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  const role = localStorage.getItem('role');

  return (
    <>
    <style jsx='true'>
      {
        `.brand-text {
        color: var(--golden-color);
        posotion: relative;
        `
      }
    </style>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
        className="navbar navbar-expand-lg fixed-top shadow-sm"
        style={{
          fontFamily: "'Poppins', sans-serif",
          background: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(224,234,252,0.85))",
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          zIndex: 999,
        }}
      >
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand brand-text fw-light  fs-4">
            JobPortal
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs-listing" className="nav-link">Jobs</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>

              {role === 'candidate' && (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/service" className="nav-link">Service</Link>
                  </li>
                </>
              )}

              {role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link to="/Controller" className="nav-link">Controller</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin-dashboard" className="nav-link">Dashboard</Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link" title="Dashboard">
                      <img
                        src="/Image/ProfileIcon.jpg"
                        alt="Avatar"
                        className="rounded-circle"
                        width="60"
                        height="60"
                        style={{
                          objectFit: 'cover',
                          border: '2px solid #0d6efd',
                          transition: '0.3s ease',
                        }}
                      />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm btn-outline-dark px-3"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link position-relative">
                      Login
                      <span className="badge bg-primary ms-2">New</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/regi"
                      className="nav-link text-white px-3 py-2 rounded"
                      style={{
                        background: "linear-gradient(135deg, #fd7e14, #ffb347)",
                        boxShadow: '0 0 12px rgba(253,126,20,0.6)',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <i className="bi bi-person-plus me-2"></i> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </motion.nav>

      <div style={{ paddingTop: '60px' }}></div>
    </>
  );
};

export default Navbar;









