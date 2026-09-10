import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(authService.getToken()));

  useEffect(() => {
    const updateAuthState = () => setIsAuthenticated(Boolean(authService.getToken()));
    window.addEventListener('admin-auth-change', updateAuthState);
    return () => window.removeEventListener('admin-auth-change', updateAuthState);
  }, []);

  const handleLogout = () => {
    authService.clearToken();
    navigate('/');
  };

  return (
    <nav className="border-b border-[#151d30] bg-[#0a0f1e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-xl font-extrabold tracking-tight text-[#00e676]">Razko</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-semibold text-[#00e676]">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/admin/dashboard" className="text-sm font-semibold text-gray-400 transition-colors hover:text-white">Dashboard</Link>
                <button onClick={handleLogout} className="text-sm font-semibold text-gray-400 transition-colors hover:text-white">Logout</button>
              </>
            ) : (
              <Link to="/admin/login" className="rounded-lg bg-[#00e676] px-4 py-2 text-sm font-bold text-[#070b14] transition-colors hover:bg-[#00ff88]">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
