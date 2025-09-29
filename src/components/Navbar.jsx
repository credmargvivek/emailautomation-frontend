import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user ,setUser } = useUser();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

   useEffect(() => {
      const fetchUser = async () => {
        try {
  
          
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/userdata`, {
            credentials: 'include',
          });
         
          
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
         
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        } 
      };
      fetchUser();
    }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/auth');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/home', label: 'Home' },
    { to: '/history', label: 'Email sent info' },
    { to: '/scrape', label: 'Scrape Management' },
    { to: '/emails', label: 'Email Management' },
    { to: '/send', label: 'Email Sending' },
    { to: '/oauth2/callback', label: 'Authorize Email'},
    { to: '/oauth2/Myapp/callback', label: 'Authorize Domain'}
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-xl flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400">Automation Tool</h1>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-gray-800 flex items-center">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-3">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-lg font-medium transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Navbar;
