'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header/Header';
import { FinancialBackground } from '@/components/FinancialBackground/FinancialBackground';
import { CalculatorGrid } from '@/components/CalculatorGrid';

import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, TrendingUp, PieChart, DollarSign, Home, Shield, CreditCard, Target, Wallet, BarChart3, Percent, Banknote } from 'lucide-react';

// Calculator slug mapping
const calculatorSlugs = {
  1: 'compound-interest',
  2: 'portfolio-allocation',
  3: 'retirement-planning',
  4: 'risk-assessment',
  5: 'mortgage',
  6: 'emergency-fund',
  7: 'debt-payoff',
  8: 'savings-goal',
  9: 'net-worth',
  10: 'investment-return',
  11: 'tax-impact',
  12: 'budget-planner',
};

export default function CalculatorsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring consistent rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const calculators = [
    {
      id: 1,
      title: mounted ? t('calculators.compound') : 'Compound Interest Calculator',
      description: mounted ? t('calculators.compound.desc') : 'Calculate the power of compound interest over time',
      icon: TrendingUp,
      comingSoon: false,
    },
    {
      id: 2,
      title: mounted ? t('calculators.portfolio') : 'Portfolio Allocation Calculator',
      description: mounted ? t('calculators.portfolio.desc') : 'Optimize your investment portfolio across different asset classes',
      icon: PieChart,
      comingSoon: true,
    },
    {
      id: 3,
      title: mounted ? t('calculators.retirement') : 'Retirement Planning Calculator',
      description: mounted ? t('calculators.retirement.desc') : 'Plan your retirement savings and goals',
      icon: DollarSign,
      comingSoon: true,
    },
    {
      id: 4,
      title: mounted ? t('calculators.riskAssessment') : 'Risk Assessment Calculator',
      description: mounted ? t('calculators.riskAssessment.desc') : 'Evaluate your risk tolerance and investment preferences',
      icon: Calculator,
      comingSoon: true,
    },
    {
      id: 5,
      title: mounted ? t('calculators.mortgage') : 'Mortgage Calculator',
      description: mounted ? t('calculators.mortgage.desc') : 'Calculate mortgage payments and interest',
      icon: Home,
      comingSoon: true,
    },
    {
      id: 6,
      title: mounted ? t('calculators.emergencyFund') : 'Emergency Fund Calculator',
      description: mounted ? t('calculators.emergencyFund.desc') : 'Determine how much you need to save for financial emergencies',
      icon: Shield,
      comingSoon: true,
    },
    {
      id: 7,
      title: mounted ? t('calculators.debtPayoff') : 'Debt Payoff Calculator',
      description: mounted ? t('calculators.debtPayoff.desc') : 'Create strategies to pay off credit cards and loans faster',
      icon: CreditCard,
      comingSoon: true,
    },
    {
      id: 8,
      title: mounted ? t('calculators.savingsGoal') : 'Savings Goal Calculator',
      description: mounted ? t('calculators.savingsGoal.desc') : 'Plan and track progress towards your financial goals',
      icon: Target,
      comingSoon: true,
    },
    {
      id: 9,
      title: mounted ? t('calculators.netWorth') : 'Net Worth Calculator',
      description: mounted ? t('calculators.netWorth.desc') : 'Track your assets and liabilities to monitor wealth growth',
      icon: Wallet,
      comingSoon: true,
    },
    {
      id: 10,
      title: mounted ? t('calculators.investment') : 'Investment Return Calculator',
      description: mounted ? t('calculators.investment.desc') : 'Analyze potential investment returns',
      icon: BarChart3,
      comingSoon: true,
    },
    {
      id: 11,
      title: mounted ? t('calculators.taxImpact') : 'Tax Impact Calculator',
      description: mounted ? t('calculators.taxImpact.desc') : 'Estimate tax implications of your investment decisions',
      icon: Percent,
      comingSoon: true,
    },
    {
      id: 12,
      title: mounted ? t('calculators.budgetPlanner') : 'Budget Planner Calculator',
      description: mounted ? t('calculators.budgetPlanner.desc') : 'Create and optimize your monthly budget allocation',
      icon: Banknote,
      comingSoon: true,
    }
  ];

  const handleCalculatorClick = (calculatorId: number) => {
    const slug = calculatorSlugs[calculatorId as keyof typeof calculatorSlugs];
    if (slug) {
      router.push(`/calculators/${slug}`);
    }
  };

  // Show calculator grid
  return (
    <FinancialBackground>
      <Header />
      <main className="relative">
        <div className="max-width-container">
          <div className="calculators-header">
            <h2>{mounted ? t('calculators.title') : 'Financial Calculators'}</h2>
            <p>{mounted ? t('calculators.subtitle') : 'Powerful tools to help you plan and optimize your financial decisions.'}</p>
          </div>

          <CalculatorGrid 
            calculators={calculators} 
            onCalculatorClick={handleCalculatorClick}
          />
        </div>
      </main>

      <style jsx>{`
        .max-width-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .calculators-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .calculators-header h2 {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          background: var(--gradient-hero);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.025em;
        }

        .calculators-header p {
          color: var(--text-secondary);
          font-size: 1.25rem;
          font-weight: 500;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .max-width-container {
            padding: 2rem 1rem;
          }

          .calculators-header h2 {
            font-size: 2rem;
          }

          .calculators-header p {
            font-size: 1rem;
          }
        }
      `}</style>
    </FinancialBackground>
  );
} 