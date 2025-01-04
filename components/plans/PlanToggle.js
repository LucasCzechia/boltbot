// components/plans/PlanToggle.js
import { useState } from 'react';

export default function PlanToggle({ onPlanTypeChange }) {
  const [planType, setPlanType] = useState('user');

  const handleToggle = (type) => {
    setPlanType(type);
    onPlanTypeChange(type);
  };

  return (
    <div className="plan-toggle-container">
      <button
        className={`plan-toggle-button ${planType === 'user' ? 'active' : ''}`}
        onClick={() => handleToggle('user')}
      >
        User Plans
      </button>
      <button
        className={`plan-toggle-button ${planType === 'server' ? 'active' : ''}`}
        onClick={() => handleToggle('server')}
      >
        Server Plans
      </button>
    </div>
  );
}
