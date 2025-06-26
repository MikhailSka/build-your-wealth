import { CalculatorItem } from './CalculatorItem';
import { LucideIcon } from 'lucide-react';

interface Calculator {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

interface CalculatorGridProps {
  calculators: Calculator[];
  onCalculatorClick?: (calculatorId: number) => void;
}

export function CalculatorGrid({ calculators, onCalculatorClick }: CalculatorGridProps) {
  // Universal grid generation functions
  const createLayoutRows = (items: Calculator[], pattern: number[]) => {
    const rows: Calculator[][] = [];
    let currentIndex = 0;
    let patternIndex = 0;
    
    while (currentIndex < items.length) {
      const itemsInThisRow = pattern[patternIndex % pattern.length];
      const remainingItems = items.length - currentIndex;
      const actualItemsInRow = Math.min(itemsInThisRow, remainingItems);
      
      if (actualItemsInRow > 0) {
        rows.push(items.slice(currentIndex, currentIndex + actualItemsInRow));
        currentIndex += actualItemsInRow;
      }
      
      patternIndex++;
    }
    
    return rows;
  };

  // Define patterns for each screen size
  const largeScreenPattern = [4, 3]; // 4/3/4/3/4/3...
  const mediumScreenPattern = [3, 2]; // 3/2/3/2/3/2...
  const smallScreenPattern = [2, 1]; // 2/1/2/1/2/1...
  const extraSmallScreenPattern = [1]; // 1/1/1/1/1...

  // Generate rows for each layout
  const largeScreenRows = createLayoutRows(calculators, largeScreenPattern);
  const mediumScreenRows = createLayoutRows(calculators, mediumScreenPattern);
  const smallScreenRows = createLayoutRows(calculators, smallScreenPattern);
  const extraSmallScreenRows = createLayoutRows(calculators, extraSmallScreenPattern);

  // Helper function to determine row class based on pattern and index
  const getRowClass = (pattern: number[], rowIndex: number, actualItemCount: number) => {
    const patternIndex = rowIndex % pattern.length;
    const expectedItemsInRow = pattern[patternIndex];
    
    // Determine row class based on expected items in this pattern position
    if (expectedItemsInRow === 4) return 'row-4';
    if (expectedItemsInRow === 3) return 'row-3';
    if (expectedItemsInRow === 2) return 'row-2';
    return 'row-1';
  };

  const handleCalculatorClick = (calculatorId: number) => {
    if (onCalculatorClick) {
      onCalculatorClick(calculatorId);
    }
  };

  return (
    <>
      <div className="calculators-grid">
        {/* Large Screen Layout: 4/3/4/3... */}
        <div className="layout-large">
          {largeScreenRows.map((row, index) => {
            const rowClass = getRowClass(largeScreenPattern, index, row.length);
            return (
              <div key={`large-${index}`} className={`grid-row ${rowClass}`}>
                {row.map((calculator) => (
                  <CalculatorItem 
                    key={calculator.id} 
                    {...calculator} 
                    onClick={() => handleCalculatorClick(calculator.id)}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Medium Screen Layout: 3/2/3/2... */}
        <div className="layout-medium">
          {mediumScreenRows.map((row, index) => {
            const rowClass = getRowClass(mediumScreenPattern, index, row.length);
            return (
              <div key={`medium-${index}`} className={`grid-row ${rowClass}`}>
                {row.map((calculator) => (
                  <CalculatorItem 
                    key={calculator.id} 
                    {...calculator} 
                    onClick={() => handleCalculatorClick(calculator.id)}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Small Screen Layout: 2/1/2/1... */}
        <div className="layout-small">
          {smallScreenRows.map((row, index) => {
            const rowClass = getRowClass(smallScreenPattern, index, row.length);
            return (
              <div key={`small-${index}`} className={`grid-row ${rowClass}`}>
                {row.map((calculator) => (
                  <CalculatorItem 
                    key={calculator.id} 
                    {...calculator} 
                    onClick={() => handleCalculatorClick(calculator.id)}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Extra Small Screen Layout: 1/1/1... */}
        <div className="layout-extra-small">
          {extraSmallScreenRows.map((row, index) => (
            <div key={`extra-small-${index}`} className="grid-row row-1">
              {row.map((calculator) => (
                <CalculatorItem 
                  key={calculator.id} 
                  {...calculator} 
                  onClick={() => handleCalculatorClick(calculator.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .calculators-grid {
          margin-top: 2rem;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }

        .layout-large,
        .layout-medium,
        .layout-small,
        .layout-extra-small {
          display: none;
          flex-direction: column;
          gap: 3rem;
        }

        .grid-row {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        /* Row alignment styles */
        .row-4 {
          justify-content: space-between;
        }

        .row-3 {
          justify-content: center;
          gap: 3rem;
        }

        .row-2 {
          justify-content: center;
          gap: 4rem;
        }

        .row-1 {
          justify-content: center;
        }

        /* Large screens: 4/3/4/3 layout */
        @media (min-width: 1201px) {
          .layout-large {
            display: flex;
          }
        }

        /* Medium screens: 3/2/3/2/3 layout */
        @media (min-width: 769px) and (max-width: 1200px) {
          .layout-medium {
            display: flex;
            gap: 2.5rem;
          }
          
          .row-3 {
            gap: 2.5rem;
          }
          
          .row-2 {
            gap: 3.5rem;
          }
        }

        /* Small screens: 2/1/2/1/2/1/2 layout */
        @media (min-width: 481px) and (max-width: 768px) {
          .layout-small {
            display: flex;
            gap: 2rem;
          }
          
          .row-2 {
            gap: 3rem;
          }
        }

        /* Extra small screens: 1/1/1/1/1/1/1/1/1 layout */
        @media (max-width: 480px) {
          .layout-extra-small {
            display: flex;
            gap: 1.5rem;
          }
        }

        /* Responsive adjustments for containers */
        @media (max-width: 1400px) {
          .calculators-grid {
            max-width: 1200px;
          }
          
          .row-4 {
            justify-content: space-evenly;
          }
        }

        @media (max-width: 1200px) {
          .grid-row {
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .grid-row {
            gap: 1.5rem;
          }
          
          .row-2 {
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .calculators-grid {
            padding: 0 1rem;
          }
          
          .grid-row {
            gap: 1.25rem;
          }
        }
      `}</style>
    </>
  );
} 