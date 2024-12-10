// pages/auth/error.js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AuthError() {
  const router = useRouter();
  const { reason, error } = router.query;

  const getErrorMessage = () => {
    switch(reason || error) {
      case 'no_token':
        return 'No authentication token was found';
      case 'complete_error':
        return 'Error completing authentication';
      case 'token_error':
        return 'Error exchanging Discord code';
      case 'user_error':
        return 'Error fetching user data';
      case 'guilds_error':
        return 'Error fetching servers';
      default:
        return 'There was a problem authenticating with Discord';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#ffcc00] mb-4">Authentication Error</h1>
        <p className="text-white mb-2">{getErrorMessage()}</p>
        <p className="text-gray-400 text-sm mb-6">Please try again or contact support if the issue persists.</p>
        <div className="space-y-4">
          <Link 
            href="/api/auth/discord" 
            className="block w-full bg-[#ffcc00] text-[#0a0a0a] px-6 py-2 rounded-full font-semibold hover:bg-[#ff9900] transition-all"
          >
            Try Again
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-transparent border border-[#ffcc00] text-[#ffcc00] px-6 py-2 rounded-full font-semibold hover:bg-[#ffcc00] hover:text-[#0a0a0a] transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
