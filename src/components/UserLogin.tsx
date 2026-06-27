import { useState } from 'react';
import { X, User, Mail, Phone, MapPin, LogOut } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

interface UserLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserLogin({ isOpen, onClose }: UserLoginProps) {
  const { contactInfo } = useAdminStore();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData.name || !userData.email || !userData.phone) {
      setError('Please fill all required fields');
      return;
    }

    if (!/^\d{10}$/.test(userData.phone)) {
      setError('Please enter valid 10-digit phone number');
      return;
    }

    // Save to localStorage
    localStorage.setItem('shopnova_user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('shopnova_user');
    setUserData({ name: '', email: '', phone: '' });
    setIsLoggedIn(false);
    setIsLogin(true);
  };

  // Check if user is already logged in
  useState(() => {
    const savedUser = localStorage.getItem('shopnova_user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <User size={20} />
            <h2 className="font-bold">{isLoggedIn ? 'My Account' : (isLogin ? 'Login' : 'Sign Up')}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {isLoggedIn ? (
            // Logged In View
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Welcome, {userData.name}!</h3>
                <p className="text-sm text-gray-500">Happy Shopping ✦</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={18} className="text-violet-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-violet-600" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{userData.phone}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Need Help?</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-violet-600" />
                    {contactInfo.email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-violet-600" />
                    <a href={`tel:${contactInfo.whatsapp}`} className="hover:text-violet-600">
                      +91 {contactInfo.whatsapp}
                    </a>
                  </p>
                  <p className="flex items-start gap-2 text-gray-600">
                    <MapPin size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            // Login/Signup Form
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  <X size={16} /> {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-sm text-violet-600 hover:underline"
                >
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service & Privacy Policy
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
