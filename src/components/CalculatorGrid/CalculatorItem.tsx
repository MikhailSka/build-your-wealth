import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CalculatorItemProps {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  onClick?: () => void;
}

export function CalculatorItem({ title, description, icon: IconComponent, comingSoon, onClick }: CalculatorItemProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring consistent rendering
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleClick = () => {
    if (!comingSoon && onClick) {
      onClick();
    }
  };

  return (
    <>
      <div className="calculator-wrapper">
        {comingSoon && (
          <div className="coming-soon-bubble">{mounted ? t('calculators.comingSoon') : 'Coming Soon'}</div>
        )}
        <div className={`calculator-card ${!comingSoon ? 'clickable' : ''}`} onClick={handleClick}>
          <div className="calculator-icon">
            <IconComponent size={32} />
          </div>
          <div className="calculator-content">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calculator-wrapper {
          position: relative;
          display: inline-block;
        }

        .calculator-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: 50%;
          width: 280px;
          height: 280px;
          min-width: 280px;
          min-height: 280px;
          max-width: 280px;
          max-height: 280px;
          padding: 1.2rem;
          transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          box-sizing: border-box;
        }

        .calculator-card:not(.clickable) {
          opacity: 0.6;
          filter: grayscale(30%);
        }

        .calculator-card:not(.clickable) .calculator-icon {
          opacity: 0.7;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .calculator-card:not(.clickable) .calculator-content h3 {
          color: var(--text-secondary);
        }

        .calculator-card:not(.clickable) .calculator-content p {
          color: var(--text-tertiary);
        }

        .calculator-card.clickable {
          cursor: pointer;
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

        .calculator-card.clickable:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-300);
        }

        .calculator-card.clickable:hover::before {
          opacity: 0.05;
        }

        .calculator-card.clickable:active {
          transform: translateY(-2px);
        }

        .calculator-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          background: var(--primary-100);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          transition: all var(--transition-normal) ease;
          flex-shrink: 0;
        }

        .calculator-card.clickable:hover .calculator-icon {
          background: var(--primary-200);
          color: var(--primary-700);
          transform: scale(1.05);
        }

        .calculator-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          overflow: hidden;
          margin: 0.5rem 0;
        }

        .calculator-content h3 {
          font-size: clamp(0.8rem, 2.5vw, 0.95rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
          line-height: 1.1;
          text-align: center;
          word-wrap: break-word;
          hyphens: auto;
          overflow-wrap: break-word;
          width: 100%;
        }

        .calculator-content p {
          color: var(--text-secondary);
          font-size: clamp(0.65rem, 2vw, 0.72rem);
          line-height: 1.2;
          margin-bottom: 0.4rem;
          text-align: center;
          word-wrap: break-word;
          hyphens: auto;
          overflow-wrap: break-word;
          width: 100%;
        }

        .coming-soon-bubble {
          position: absolute;
          top: 0;
          right: 0;
          width: 50px;
          height: 50px;
          background: #fbbf24;
          color: #1f2937;
          font-size: 0.45rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transform: translate(25%, -25%);
          padding: 0.2rem;
          text-align: center;
          line-height: 0.9;
          word-break: break-word;
          hyphens: auto;
        }

        @media (max-width: 768px) {
          .calculator-card {
            width: 240px;
            height: 240px;
            min-width: 240px;
            min-height: 240px;
            max-width: 240px;
            max-height: 240px;
            padding: 1rem;
          }

          .calculator-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;
            min-height: 38px;
          }

          .coming-soon-bubble {
            width: 44px;
            height: 44px;
            font-size: 0.4rem;
            transform: translate(20%, -20%);
          }
        }

        @media (max-width: 480px) {
          .calculator-card {
            width: 200px;
            height: 200px;
            min-width: 200px;
            min-height: 200px;
            max-width: 200px;
            max-height: 200px;
            padding: 0.8rem;
          }

          .calculator-icon {
            width: 32px;
            height: 32px;
            min-width: 32px;
            min-height: 32px;
          }

          .coming-soon-bubble {
            width: 38px;
            height: 38px;
            font-size: 0.35rem;
            transform: translate(15%, -15%);
          }
        }
      `}</style>
    </>
  );
} 