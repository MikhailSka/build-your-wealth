'use client';

import { Header } from '@/components/Header/Header';
import { FinancialBackground } from '@/components/FinancialBackground/FinancialBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Calculator, TrendingUp, Shield, Target, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t('home.features.lessons'),
      description: t('home.features.lessons.desc'),
    },
    {
      icon: Calculator,
      title: t('home.features.calculators'),
      description: t('home.features.calculators.desc'),
    },
    {
      icon: TrendingUp,
      title: t('home.features.tracking'),
      description: t('home.features.tracking.desc'),
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Understand how to protect your investments and manage risk effectively.',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Set and achieve your financial goals with our systematic approach.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a community of learners on their wealth-building journey.',
    },
  ];

  return (
    <FinancialBackground>
      <Header />
      <main className="relative">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="max-width-container">
              <div className="hero-content">
                <h1 className="hero-title">
                  {t('home.welcome')}
                </h1>
                <p className="hero-description">
                  {t('home.subtitle')}
                </p>
                <div className="hero-actions">
                  <Link href="/lessons" className="cta-button primary">
                    {t('home.cta.start')}
                    <BookOpen size={20} />
                  </Link>
                  <Link href="/calculators" className="cta-button secondary">
                    {t('home.cta.explore')}
                    <Calculator size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <div className="max-width-container">
              <div className="features-header">
                <h2>Everything You Need to Build Wealth</h2>
                <p>Comprehensive tools and resources for your investment journey</p>
              </div>
              <div className="features-grid">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="feature-card">
                      <div className="feature-icon">
                        <IconComponent size={28} />
                      </div>
                      <div className="feature-content">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
        </div>
          </section>
      </main>

      <style jsx>{`
        .max-width-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-section {
          padding: 6rem 0 8rem;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }

        .hero-highlight {
          background: var(--gradient-hero);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: var(--radius-lg);
          font-weight: 600;
          font-size: 1.125rem;
          text-decoration: none;
          transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
        }

        .cta-button.primary {
          background: var(--gradient-hero);
          color: white;
          box-shadow: var(--shadow-lg);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .cta-button.secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-color: var(--border-primary);
        }

        .cta-button.secondary:hover {
          background: var(--bg-tertiary);
          border-color: var(--primary-300);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .features-section {
          padding: 4rem 0 6rem;
        }

        .features-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .features-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          letter-spacing: -0.025em;
        }

        .features-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          padding: 2rem;
          transition: all var(--transition-normal) ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-300);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          background: var(--primary-100);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin-bottom: 1.5rem;
          transition: all var(--transition-normal) ease;
        }

        .feature-card:hover .feature-icon {
          background: var(--primary-200);
          color: var(--primary-700);
          transform: scale(1.1);
        }

        .feature-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .feature-content p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 0 4rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1.125rem;
            margin-bottom: 2rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .features-header h2 {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </FinancialBackground>
  );
}
