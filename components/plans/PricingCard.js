// components/plans/PricingCard.js
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PricingCard({ plan, onSelect, isSelected }) {
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

  return (
    <div className="pricing-card">
      <h3 className="plan-name">{plan.name}</h3>
      <p className="plan-description">{plan.description}</p>
      <div className="plan-price">
        <span className="price-currency">$</span>
        <span className="price-amount">
          {plan.priceMonthly !== undefined ? plan.priceMonthly : 'Contact'}
        </span>
        {plan.priceMonthly !== undefined && <span className="price-period">/mo</span>}
      </div>
      <ul className="plan-features">
        {plan.features.map((feature, index) => (
          <li key={index} className="feature-item">
            <span className="feature-icon">
              {feature.included ? <Check size={16} /> : <X size={16} />}
            </span>
            <span className="feature-name">{feature.name}</span>
          </li>
        ))}
      </ul>
      <button className={`select-plan-button ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
        {isSelected ? 'Selected' : 'Select Plan'}
      </button>
    </div>
  );
}
