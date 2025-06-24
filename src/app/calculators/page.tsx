'use client';

import { Header } from '@/components/Header/Header';
import { FinancialBackground } from '@/components/FinancialBackground/FinancialBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { Calculator, TrendingUp, PieChart, DollarSign } from 'lucide-react';

export default function CalculatorsPage() {
  const { theme } = useTheme();

  const calculators = [
    {
      id: 1,
      title: 'Compound Interest Calculator',
      description: 'Calculate how your investments grow over time with compound interest',
      icon: TrendingUp,
      comingSoon: true,
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
      title: 'Retirement Planning Calculator',
      description: 'Plan your retirement savings and estimate future income needs',
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
  ];

  return (
    <FinancialBackground>
      <Header />
      <main className="relative">
          <div className="max-width-container">
            <div className="calculators-header">
              <h2>Investment Calculators</h2>
              <p>Powerful tools to help you make informed investment decisions</p>
            </div>

            <div className="calculators-grid">
              {calculators.map((calculator) => {
                const IconComponent = calculator.icon;
                return (
                  <div key={calculator.id} className="calculator-card">
                    <div className="calculator-icon">
                      <IconComponent size={32} />
                    </div>
                    <div className="calculator-content">
                      <h3>{calculator.title}</h3>
                      <p>{calculator.description}</p>
                      {calculator.comingSoon && (
                        <span className="coming-soon-badge">Coming Soon</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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

        .calculators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .calculator-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: 2rem;
          transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .calculator-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-hero);
          opacity: 0;
          transition: opacity var(--transition-normal) ease;
          z-index: -1;
        }

        .calculator-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-300);
        }

        .calculator-card:hover::before {
          opacity: 0.05;
        }

        .calculator-icon {
          width: 64px;
          height: 64px;
          background: var(--primary-100);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin-bottom: 1.5rem;
          transition: all var(--transition-normal) ease;
        }

        .calculator-card:hover .calculator-icon {
          background: var(--primary-200);
          color: var(--primary-700);
          transform: scale(1.1);
        }

        .calculator-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .calculator-content p {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .coming-soon-badge {
          display: inline-block;
          background: var(--accent-100);
          color: var(--accent-700);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
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

          .calculators-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .calculator-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </FinancialBackground>
  );
} 