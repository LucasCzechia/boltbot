// pages/plans.js
import { useState } from 'react';
import Head from 'next/head';
import DashboardNav from '../components/dashboard/DashboardNav';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import PlanFeatures from '../components/plans/PlanFeatures';
import PricingTabs from '../components/plans/PricingTabs';
import Starfield from '../components/misc/Starfield';

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <>
      <Head>
        <title>Premium Plans - BoltBot⚡</title>
        <meta name="description" content="Upgrade to BoltBot Premium for enhanced features and capabilities." />
      </Head>

      <div className="dashboard-wrapper">
        <DashboardNav />
        <Starfield />
        
        <main className="pricing-page">
          <div className="pricing-content">
            <div className="pricing-header">
              <h1>Upgrade to Premium</h1>
              <p>Unlock the full potential of BoltBot⚡</p>
            </div>

            <PricingTabs 
              activeCycle={billingCycle}
              onCycleChange={setBillingCycle}
            />
            
            <div className="pricing-grid">
              {/* Free Plan */}
              <div className="pricing-card free">
                <div className="pricing-card-header">
                  <h2>Free</h2>
                  <p>Perfect for getting started</p>
                  <div className="pricing-amount">
                    <span className="currency">$</span>
                    <span className="amount">0</span>
                    <span className="period">/mo</span>
                  </div>
                </div>

                <PlanFeatures plan="free" />

                <button className="pricing-button current">
                  Current Plan
                </button>
              </div>

              {/* Premium Plan */}
              <div className="pricing-card premium featured">
                <div className="featured-badge">Most Popular</div>
                <div className="pricing-card-header">
                  <h2>Premium</h2>
                  <p>For power users and growing communities</p>
                  <div className="pricing-amount">
                    <span className="currency">$</span>
                    <span className="amount">{billingCycle === 'monthly' ? '10' : '8'}</span>
                    <span className="period">/mo</span>
                    {billingCycle === 'annual' && (
                      <span className="savings">Save 20%</span>
                    )}
                  </div>
                </div>

                <PlanFeatures plan="premium" />

                <button className="pricing-button premium">
                  Upgrade to Premium
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="pricing-card enterprise">
                <div className="pricing-card-header">
                  <h2>Enterprise</h2>
                  <p>Custom solutions for large communities</p>
                  <div className="pricing-amount">
                    <span className="contact">Contact Us</span>
                  </div>
                </div>

                <PlanFeatures plan="enterprise" />

                <button className="pricing-button enterprise">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <DashboardFooter />
      </div>
    </>
  );
                }
