// components/plans/PlanFeatures.js
import { Check, X } from 'lucide-react';

const PLAN_FEATURES = {
  free: [
    { feature: "30 Messages Every 3 Hours", included: true },
    { feature: "Limited AI Model Selection (Gemini)", included: true },
    { feature: "Limited Tools Set (e.g., Weather, Current Time)", included: true },
    { feature: "Limited Feature Set (e.g., Image, Vision)", included: true },
    {
      feature: "Voting Privileges:",
      included: true,
      subFeatures: [
        "Increased Message Limit:",
        "(30 -> 50 Messages)", 
        "Unlock a Single Premium Tool"
      ]
    },
    { feature: "Extended Message Limit", included: false },
    { feature: "AI Model Selection", included: false },
    { feature: "Direct Bot Interaction (DM) & Slash Commands", included: false},
    { feature: "Custom Personalities & Behavior", included: false},
  ],
  premium: [
    { feature: "100 Messages Every 3 Hours", included: true },
    { feature: "AI Model Selection (Gemini or GPT; GPT incurs a 50-message reduction)", included: true },
    { feature: "Unlock All Tools", included: true },
    { feature: "Unlock All Features", included: true },
    {
      feature: "Voting Privileges:",
      included: true,
      subFeatures: [
        "Increased Message Limit:",
        "(100 -> 125 Messages)", 
      ]
    },
    { feature: "Direct Bot Interaction (DM) & Slash Commands", included: true },
    { feature: "Custom Personalities & Behavior", included: true},
    ],
  custom: [
    { feature: "Personalized Custom Bot", included: true },
    { feature: "Custom Message Limit", included: true },
    { feature: "Customizable Tool Set", included: true },
    { feature: "Customizable Feature Set", included: true },
    { feature: "Dedicated & Priority Support", included: true },
    { feature: "Integration with Existing System", included: true },
  ]
};

export default function PlanFeatures({ plan }) {
  return (
    <ul className="plan-features">
      {PLAN_FEATURES[plan]?.map((item, index) => (
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