// pages/plans.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import PlanToggle from '../components/plans/PlanToggle';
import PricingCard from '../components/plans/PricingCard';
import PlanComparison from '../components/plans/PlanComparison';
import { USER_PLANS, SERVER_PLANS } from '../utils/plan-data';

export default function PlansPage() {
  const [planType, setPlanType] = useState('user');
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [currentPlans, setCurrentPlans] = useState([]);

  useEffect(() => {
    if (planType === 'user') {
      setCurrentPlans(USER_PLANS);
    } else if (planType === 'server') {
      setCurrentPlans(SERVER_PLANS);
    }
    setSelectedPlans([]);
  }, [planType]);

  const handlePlanTypeChange = (newPlanType) => {
    setPlanType(newPlanType);
  };

   const handlePlanSelect = (planId) => {
    setSelectedPlans((prevSelected) => {
      if (prevSelected.includes(planId)) {
        return prevSelected.filter((id) => id !== planId);
      } else {
        return [...prevSelected, planId];
      }
    });
  };

  const plansForComparison = currentPlans.filter(plan => selectedPlans.includes(plan.id));

  return (
    <div className="plans-page">
      <Head>
        <title>Explore Plans - BoltBot⚡</title>
        <meta name="description" content="Compare different BoltBot plans to find the best fit for your needs." />
      </Head>

      <DashboardNav />

      <main className="plans-content">
        <div className="plans-header">
            <h1 className="main-title">Upgrade to Premium</h1>
             <h2 className="plans-title">Explore BoltBot⚡ plans</h2>
            <PlanToggle onPlanTypeChange={handlePlanTypeChange} />
        </div>

        <div className="pricing-cards-container">
          {currentPlans.map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={() => handlePlanSelect(plan.id)}
              isSelected={selectedPlans.includes(plan.id)}
            />
          ))}
        </div>

        {plansForComparison.length > 0 && (
           <div className="plan-comparison-wrapper">
            <h2 className="comparison-title">Comparing Plans</h2>
            <PlanComparison
              plans={plansForComparison}
              onSelect={handlePlanSelect}
             />
        </div>
        )}

         {plansForComparison.length === 0 && selectedPlans.length > 0 && (
          <p className="no-comparison">
            No common features to compare for the selected plans.
          </p>
        )}
      </main>

      <DashboardFooter />
    </div>
  );
}
