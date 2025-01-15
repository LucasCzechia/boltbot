// components/plans/PlanFeatures.js
import { Check, X } from 'lucide-react';

const PLAN_FEATURES = {
  free: [
    { feature: "30 Messages Every 3 Hours", included: true },
    { feature: "Access to Select Tools", included: true },
    { feature: "Limited Feature Set (e.g., Image, Vision)", included: true },
    {
      feature: "Voting Privileges:",
      included: true,
      subFeatures: [
        "Increase Message Allotment",
        "Unlock a Single Tool (Cumulative; Non-participation results in re-locking all unlocked tools)"
      ]
    },
    { feature: "Extended Message Allotment", included: false },
    { feature: "AI Model Selection", included: false },
    { feature: "Comprehensive Tool Access", included: false},
    { feature: "Full Feature Availability", included: false },
    { feature: "Direct Bot Interaction (DM) & Slash Commands", included: false},
    { feature: "Custom Personality", included: false},
  ],
  premium: [
    { feature: "Extended Message Allotment (100 Every 3 Hours)", included: true },
    { feature: "AI Model Selection (Gemini or GPT; GPT incurs a 50-message reduction)", included: true },
    { feature: "Comprehensive Tool Access", included: true },
    { feature: "Full Feature Availability", included: true },
    { feature: "Direct Bot Interaction (DM) & Slash Commands", included: true },
    { feature: "Custom Personality", included: true},
    { feature: "Voting for Increased Message Allotment", included: true }
  ],
  custom: [
    { feature: "Custom Message Allotment", included: true },
    { feature: "Personalized Bot Behavior & Functionality", included: true },
    { feature: "Tailored Tool Selection", included: true },
    { feature: "Customizable Feature Set", included: true },
    { feature: "Dedicated Support & Account Management", included: true },
    { feature: "Integration with Existing Systems", included: true },
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
          {item.subFeatures && (
            <ul className="sub-features">
              {item.subFeatures.map((subFeature, subIndex) => (
                <li key={subIndex} className="sub-feature-item">
                  {subFeature}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
