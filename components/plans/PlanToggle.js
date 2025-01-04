// components/plans/PlanToggle.js
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function PlanToggle({ onPlanTypeChange, isDarkMode }) {
  const [planType, setPlanType] = useState('user');

  const handleToggle = (type) => {
    setPlanType(type);
    onPlanTypeChange(type);
  };

  return (
    <div className={`plan-toggle-container ${isDarkMode ? 'dark' : 'light'}`}>
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
