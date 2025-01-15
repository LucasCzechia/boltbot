// components/plans/PricingTabs.js
import { useState } from 'react';

export default function PricingTabs({ activeCycle, onCycleChange }) {
  return (
    <div className="pricing-tabs">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeCycle === 'monthly' ? 'active' : ''}`}
          onClick={() => onCycleChange('monthly')}
        >
          Monthly
        </button>
        <button
          className={`tab-button ${activeCycle === 'annual' ? 'active' : ''}`}
          onClick={() => onCycleChange('annual')}
        >
          Annual
          <span className="savings-badge">Save 20%</span>
        </button>
      </div>
    </div>
  );
}
