// components/plans/PlanComparison.js
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PlanComparison({ plans, isDarkMode }) {
  const [currentWidth, setCurrentWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = currentWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!plans || plans.length === 0) {
    return <p className={`no-plans ${isDarkMode ? 'dark' : 'light'}`}>No plans selected for comparison.</p>;
  }

  // Extract all unique features from the selected plans
  const allFeatures = plans.reduce((acc, plan) => {
    plan.features.forEach(f => {
      if (!acc.includes(f.name)) {
        acc.push(f.name);
      }
    });
    return acc;
  }, []);

  return (
    <div className={`plan-comparison-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="comparison-header">
        <div className="header-feature">Features</div>
        {plans.map(plan => (
          <div key={plan.id} className="header-plan-name">{plan.name}</div>
        ))}
      </div>
      <div className="comparison-body">
        {allFeatures.map(featureName => (
          <div key={featureName} className="comparison-row">
            <div className="row-feature">{featureName}</div>
            {plans.map(plan => {
              const feature = plan.features.find(f => f.name === featureName);
              const isIncluded = feature && feature.included;
              return (
                <div key={plan.id} className="row-plan-status">
                  {isIncluded ? <Check size={16} /> : <X size={16} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
