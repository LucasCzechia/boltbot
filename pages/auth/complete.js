// pages/auth/complete.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logger } from '../../utils/logger';

export default function AuthComplete() {
  const router = useRouter();

  useEffect(() => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1];

      if (token) {
        localStorage.setItem('token', token);
        
        document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        console.log('Token stored, redirecting to dashboard');
        
        router.replace('/dashboard');
      } else {
        console.error('No token found in cookies');
        router.replace('/auth/error?reason=no_token');
      }
    } catch (error) {
      console.error('Error in auth complete:', error);
      router.replace('/auth/error?reason=complete_error');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffcc00] mx-auto"></div>
        <p className="mt-4 text-white">Setting up your session...</p>
      </div>
    </div>
  );
}
