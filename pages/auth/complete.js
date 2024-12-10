// pages/auth/complete.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthComplete() {
  const router = useRouter();

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    try {
      const token = getCookie('auth_token');
      console.log('Looking for auth token...');

      if (token) {
        window.localStorage.setItem('token', token);
        document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.replace('/dashboard');
      } else {
        router.replace('/auth/error?reason=no_token');
      }
    } catch (error) {
      console.error('Error completing auth:', error);
      router.replace('/auth/error?reason=complete_error');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffcc00] mx-auto"></div>
        <p className="mt-4 text-white">Almost there...</p>
        <p className="mt-2 text-sm text-gray-400">Completing your login</p>
      </div>
    </div>
  );
}
