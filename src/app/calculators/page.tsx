'use client';

import { useState } from 'react';
import { Header } from '@/components/Header/Header';
import { FinancialBackground } from '@/components/FinancialBackground/FinancialBackground';
import { CalculatorGrid } from '@/components/CalculatorGrid';
import { CompoundInterestCalculator } from '@/components/calculators';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, TrendingUp, PieChart, DollarSign, Home, Shield, CreditCard, Target, Wallet, BarChart3, Percent, Banknote } from 'lucide-react';

export default function CalculatorsPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeCalculator, setActiveCalculator] = useState<number | null>(null);

  const calculators = [
    {
      id: 1,
      title: t('calculators.compound'),
      description: t('calculators.compound.desc'),
      icon: TrendingUp,
      comingSoon: false,
    },
    {
      id: 2,
      title: 'Portfolio Allocation Calculator',
      description: 'Optimize your investment portfolio across different asset classes',
      icon: PieChart,
      comingSoon: true,
    },
    {
      id: 3,
      title: t('calculators.retirement'),
      description: t('calculators.retirement.desc'),
      icon: DollarSign,
      comingSoon: true,
    },
    {
      id: 4,
      title: 'Risk Assessment Calculator',
      description: 'Evaluate your risk tolerance and investment preferences',
      icon: Calculator,
      comingSoon: true,
    },
    {
      id: 5,
      title: t('calculators.mortgage'),
      description: t('calculators.mortgage.desc'),
      icon: Home,
      comingSoon: true,
    },
    {
      id: 6,
      title: 'Emergency Fund Calculator',
      description: 'Determine how much you need to save for financial emergencies',
      icon: Shield,
      comingSoon: true,
    },
    {
      id: 7,
      title: 'Debt Payoff Calculator',
      description: 'Create strategies to pay off credit cards and loans faster',
      icon: CreditCard,
      comingSoon: true,
    },
    {
      id: 8,
      title: 'Savings Goal Calculator',
      description: 'Plan and track progress towards your financial goals',
      icon: Target,
      comingSoon: true,
    },
    {
      id: 9,
      title: 'Net Worth Calculator',
      description: 'Track your assets and liabilities to monitor wealth growth',
      icon: Wallet,
      comingSoon: true,
    },
    {
      id: 10,
      title: t('calculators.investment'),
      description: t('calculators.investment.desc'),
      icon: BarChart3,
      comingSoon: true,
    },
    {
      id: 11,
      title: 'Tax Impact Calculator',
      description: 'Estimate tax implications of your investment decisions',
      icon: Percent,
      comingSoon: true,
    },
    {
      id: 12,
      title: 'Budget Planner Calculator',
      description: 'Create and optimize your monthly budget allocation',
      icon: Banknote,
      comingSoon: true,
    }
  ];

  const handleCalculatorClick = (calculatorId: number) => {
    setActiveCalculator(calculatorId);
  };

  const handleBackToGrid = () => {
    setActiveCalculator(null);
  };

  // Show individual calculator if one is active
  if (activeCalculator) {
    switch (activeCalculator) {
      case 1:
        return (
          <FinancialBackground>
            <Header />
            <main className="relative">
              <CompoundInterestCalculator onBack={handleBackToGrid} />
            </main>
          </FinancialBackground>
        );
      default:
        // For other calculators that aren't implemented yet
        setActiveCalculator(null);
        break;
    }
  }

  // Show calculator grid
  return (
    <FinancialBackground>
      <Header />
      <main className="relative">
        <div className="max-width-container">
          <div className="calculators-header">
            <h2>{t('calculators.title')}</h2>
            <p>{t('calculators.subtitle')}</p>
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