import { Link } from 'react-router-dom';
import { useAuth } from '../stores/auth';
import { Heart } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold">Aarogya Setu</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/doctors" className="text-gray-600 hover:text-gray-900">
              Doctors
            </Link>
            <Link to="/appointments" className="text-gray-600 hover:text-gray-900">
              Appointments
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}