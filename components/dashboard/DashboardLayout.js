// components/dashboard/DashboardLayout.js
import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children, navigationItems, activeTab, onTabChange }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-primary"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-primary/10 transform transition-transform duration-300 z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            BoltBot⚡ Dashboard
          </Link>
        </div>

        <nav className="mt-6">
          <ul className="space-y-1 px-3">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`
                    w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-primary/10'}
                    ${activeTab === item.id ? 'bg-primary text-dark font-medium' : 'text-light/80'}
                  `}
                  onClick={() => !item.disabled && onTabChange(item.id)}
                  disabled={item.disabled}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={`
        flex-1 p-6 md:ml-64 transition-all duration-300
        ${isSidebarOpen ? 'ml-64' : 'ml-0'}
      `}>
        {children}
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
        }
