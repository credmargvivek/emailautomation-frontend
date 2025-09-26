import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/google-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        navigate('/');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex w-full max-w-5xl bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
        
        {/* Left side illustration */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 bg-gradient-to-br from-indigo-700 to-purple-700 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-lg text-indigo-100 text-center">
            Sign in to continue to your personalized dashboard and explore more.
          </p>
        </div>

        {/* Right side login card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-10 flex flex-col justify-center text-gray-100"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-400">
            Sign In / Sign Up
          </h2>

          {error && (
            <div className="bg-red-900/40 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => setError('Google login failed')}
              shape="pill"
              size="large"
              theme="filled_blue"
            />
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default GoogleAuth;
