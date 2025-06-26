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
  
  const handleClick = () => {
    if (!comingSoon && onClick) {
      onClick();
    }
  };

  return (
    <>
      <div className={`calculator-card ${!comingSoon ? 'clickable' : ''}`} onClick={handleClick}>
        <div className="calculator-icon">
          <IconComponent size={32} />
        </div>
        <div className="calculator-content">
          <h3>{title}</h3>
          <p>{description}</p>
          {comingSoon && (
            <span className="coming-soon-badge">{t('calculators.comingSoon')}</span>
          )}
        </div>
      </div>

      <style jsx>{`
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
          padding: 1.5rem;
          transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
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
          width: 56px;
          height: 56px;
          min-width: 56px;
          min-height: 56px;
          background: var(--primary-100);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-600);
          margin-bottom: 1rem;
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
        }

        .calculator-content h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          line-height: 1.2;
          text-align: center;
          word-wrap: break-word;
          hyphens: auto;
        }

        .calculator-content p {
          color: var(--text-secondary);
          font-size: 0.8rem;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          text-align: center;
          word-wrap: break-word;
          hyphens: auto;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .coming-soon-badge {
          display: inline-block;
          background: var(--accent-100);
          color: var(--accent-700);
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .calculator-card {
            width: 240px;
            height: 240px;
            min-width: 240px;
            min-height: 240px;
            max-width: 240px;
            max-height: 240px;
            padding: 1.25rem;
          }

          .calculator-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
            min-height: 48px;
          }

          .calculator-content h3 {
            font-size: 1rem;
          }

          .calculator-content p {
            font-size: 0.75rem;
          }

          .coming-soon-badge {
            font-size: 0.6rem;
            padding: 0.15rem 0.5rem;
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
            padding: 1rem;
          }

          .calculator-icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
            min-height: 40px;
            margin-bottom: 0.75rem;
          }

          .calculator-content h3 {
            font-size: 0.9rem;
            margin-bottom: 0.4rem;
          }

          .calculator-content p {
            font-size: 0.7rem;
            margin-bottom: 0.5rem;
            -webkit-line-clamp: 2;
          }

          .coming-soon-badge {
            font-size: 0.55rem;
            padding: 0.1rem 0.4rem;
          }
        }
      `}</style>
    </>
  );
} 