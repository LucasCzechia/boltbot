// components/dashboard/UserProfile.jsx
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LogOut, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';

export default function UserProfile({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="user-profile" ref={dropdownRef}>
      <button 
        className="profile-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          alt={user.username}
          width={32}
          height={32}
          className="avatar"
        />
        <span className="username">{user.username}</span>
        <ChevronDown 
          size={16} 
          className={`chevron ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <Image
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt={user.username}
              width={48}
              height={48}
              className="avatar-large"
            />
            <div className="user-info">
              <span className="username-large">{user.username}</span>
              <span className="user-id">#{user.discriminator}</span>
            </div>
          </div>
          <div className="dropdown-divider" />
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 
