// pages/dashboard/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/servers');
  }, [router]);

  return null;
}
