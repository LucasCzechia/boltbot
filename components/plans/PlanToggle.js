// components/plans/PlanToggle.js
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function PlanToggle({ onPlanTypeChange }) {
  const [planType, setPlanType] = useState('user');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(theme === 'dark');
  }, []);

  const handleToggle = (type) => {
    setPlanType(type);
    onPlanTypeChange(type);
  };

  return (
    <div className="plan-toggle-container">
      <button
        className={`plan-toggle-button ${planType === 'user' ? 'active' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        onClick={() => handleToggle('user')}
      >
        User Plans
      </button>
      <button
        className={`plan-toggle-button ${planType === 'server' ? 'active' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        onClick={() => handleToggle('server')}
      >
        Server Plans
      </button>
    </div>
  );
}
