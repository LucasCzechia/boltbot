// pages/plans.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import PlanToggle from '../components/plans/PlanToggle';
import PricingCard from '../components/plans/PricingCard';
import PlanComparison from '../components/plans/PlanComparison';
import { USER_PLANS, SERVER_PLANS } from '../data/plan-data';
import '../../styles/plans/plans-page.css';
import '../../styles/plans/plan-toggle.css';
import '../../styles/plans/pricing-card.css';
import '../../styles/plans/plan-comparison.css';

export default function PlansPage() {
  const [planType, setPlanType] = useState('user');
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPlans, setCurrentPlans] = useState([]);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    if (planType === 'user') {
      setCurrentPlans(USER_PLANS);
    } else if (planType === 'server') {
      setCurrentPlans(SERVER_PLANS);
    }
    setSelectedPlans([]); // Clear selected plans when plan type changes
  }, [planType]);

  const handlePlanTypeChange = (newPlanType) => {
    setPlanType(newPlanType);
  };

  const toggleSelectPlan = (planId) => {
    setSelectedPlans(currentSelected => {
      if (currentSelected.includes(planId)) {
        return currentSelected.filter(id => id !== planId);
      } else {
        return [...currentSelected, planId];
      }
    });
  };

  const plansForComparison = currentPlans.filter(plan => selectedPlans.includes(plan.id));

  return (
    <div className={`plans-page ${isDarkMode ? 'dark' : 'light'}`}>
      <Head>
        <title>Explore Plans - BoltBot⚡</title>
        <meta name="description" content="Compare different BoltBot plans to find the best fit for your needs." />
      </Head>

      <DashboardNav />

      <main className="plans-content">
        <div className="plans-header">
          <h1>Explore Our Plans</h1>
          <PlanToggle onPlanTypeChange={handlePlanTypeChange} isDarkMode={isDarkMode} />
        </div>

        <div className="pricing-cards-container">
          {currentPlans.map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isDarkMode={isDarkMode}
              onSelect={() => toggleSelectPlan(plan.id)}
              isSelected={selectedPlans.includes(plan.id)}
            />
          ))}
        </div>

        {plansForComparison.length > 0 && (
          <div className="plan-comparison-wrapper">
            <h2>Comparing Plans</h2>
            <PlanComparison plans={plansForComparison} isDarkMode={isDarkMode} />
          </div>
        )}

        {plansForComparison.length === 0 && selectedPlans.length > 0 && (
          <p className={`no-comparison ${isDarkMode ? 'dark' : 'light'}`}>
            No common features to compare for the selected plans.
          </p>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}
