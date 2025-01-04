// data/plan-data.js
export const USER_PLANS = [
  {
    id: 'user-free',
    name: 'Free',
    description: 'For individuals exploring basic features.',
    priceMonthly: 0,
    priceAnnually: 0,
    features: [
      { name: 'Basic Access', included: true },
      { name: 'Limited Storage', included: true },
      { name: 'Standard Support', included: true },
      { name: 'Advanced Features', included: false },
      { name: 'Priority Support', included: false },
    ],
  },
  {
    id: 'user-pro',
    name: 'Pro',
    description: 'For professionals needing advanced tools.',
    priceMonthly: 19,
    priceAnnually: 199,
    features: [
      { name: 'Full Access', included: true },
      { name: 'Generous Storage', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Customizations', included: false },
    ],
  },
  {
    id: 'user-enterprise',
    name: 'Enterprise',
    description: 'Scalable solutions for large teams.',
    priceMonthly: 99,
    priceAnnually: 999,
    features: [
      { name: 'Unlimited Access', included: true },
      { name: 'Unlimited Storage', included: true },
      { name: '24/7 Dedicated Support', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Full Customizations', included: true },
    ],
  },
];

export const SERVER_PLANS = [
  {
    id: 'server-basic',
    name: 'Basic Server',
    description: 'Entry-level server for small applications.',
    priceMonthly: 29,
    priceAnnually: 299,
    features: [
      { name: 'Standard Server Resources', included: true },
      { name: 'Limited Bandwidth', included: true },
      { name: 'Basic Monitoring', included: true },
      { name: 'Automated Backups', included: false },
      { name: 'DDoS Protection', included: false },
    ],
  },
  {
    id: 'server-standard',
    name: 'Standard Server',
    description: 'Balanced resources for growing applications.',
    priceMonthly: 59,
    priceAnnually: 599,
    features: [
      { name: 'Enhanced Server Resources', included: true },
      { name: 'High Bandwidth', included: true },
      { name: 'Advanced Monitoring', included: true },
      { name: 'Automated Daily Backups', included: true },
      { name: 'Basic DDoS Protection', included: true },
    ],
  },
  {
    id: 'server-premium',
    name: 'Premium Server',
    description: 'High-performance server for critical applications.',
    priceMonthly: 99,
    priceAnnually: 999,
    features: [
      { name: 'High-Performance Resources', included: true },
      { name: 'Unlimited Bandwidth', included: true },
      { name: 'Comprehensive Monitoring', included: true },
      { name: 'Real-time Backups', included: true },
      { name: 'Advanced DDoS Protection', included: true },
    ],
  },
];
