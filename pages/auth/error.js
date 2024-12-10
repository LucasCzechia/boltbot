// pages/auth/error.js
import Link from 'next/link';

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#ffcc00] mb-4">Authentication Error</h1>
        <p className="text-white mb-6">There was a problem authenticating with Discord.</p>
        <Link href="/" className="bg-[#ffcc00] text-[#0a0a0a] px-6 py-2 rounded-full font-semibold hover:bg-[#ff9900] transition-all">
          Return Home
        </Link>
      </div>
    </div>
  );
}
