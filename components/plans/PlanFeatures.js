// components/plans/PlanFeatures.js
import { Check, X } from 'lucide-react';

const PLAN_FEATURES = {
  free: [
    { feature: "1,000 AI messages per month", included: true },
    { feature: "10 Image generations per month", included: true },
    { feature: "Basic file operations", included: true },
    { feature: "Standard support", included: true },
    { feature: "Custom personalities", included: false },
    { feature: "Priority support access", included: false },
    { feature: "Advanced security features", included: false },
    { feature: "Early access features", included: false }
  ],
  premium: [
    { feature: "Unlimited AI messages", included: true },
    { feature: "100 Image generations per month", included: true },
    { feature: "Advanced file operations", included: true },
    { feature: "Priority support", included: true },
    { feature: "Custom personalities", included: true },
    { feature: "Advanced security features", included: true },
    { feature: "Early access features", included: true },
    { feature: "API access", included: true }
  ],
  enterprise: [
    { feature: "Unlimited everything", included: true },
    { feature: "Dedicated support team", included: true },
    { feature: "Custom integrations", included: true },
    { feature: "SLA guarantees", included: true },
    { feature: "Advanced analytics", included: true },
    { feature: "Custom deployment", included: true },
    { feature: "Enterprise security", included: true },
    { feature: "Training & onboarding", included: true }
  ]
};

export default function PlanFeatures({ plan }) {
  return (
    <ul className="plan-features">
      {PLAN_FEATURES[plan].map((item, index) => (
        <li 
          key={index}
          className={`feature-item ${!item.included ? 'disabled' : ''}`}
        >
          {item.included ? (
            <Check className="feature-icon included" />
          ) : (
            <X className="feature-icon not-included" />
          )}
          <span>{item.feature}</span>
        </li>
      ))}
    </ul>
  );
}
