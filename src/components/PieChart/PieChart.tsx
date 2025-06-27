import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import './PieChart.css';

interface PieChartData {
  startingAmount: number;
  totalContributions: number;
  interest: number;
  totalAmount: number;
}

interface PieChartProps {
  data: PieChartData;
  title?: string;
  currency?: string;
}

// Helper function to create SVG path for pie slice
const createPieSlice = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  return [
    "M", centerX, centerY,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

export function PieChart({ data, title, currency = '$' }: PieChartProps) {
  const { t, language } = useLanguage();
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { startingAmount, totalContributions, interest, totalAmount } = data;
  
  if (totalAmount === 0) return null;
  
  const startingPercentage = (startingAmount / totalAmount) * 100;
  const contributionsPercentage = (totalContributions / totalAmount) * 100;
  const interestPercentage = (interest / totalAmount) * 100;
  
  // Calculate angles for pie slices
  const startingAngle = (startingPercentage / 100) * 360;
  const contributionsAngle = (contributionsPercentage / 100) * 360;
  const interestAngle = (interestPercentage / 100) * 360;
  
  const centerX = 120;
  const centerY = 120;
  const radius = 100;
  
  let currentAngle = 0;
  
  const chartTitle = title || t('compoundCalculator.resultsSection.pieChart.title');
  
  const formatCurrency = (amount: number) => {
    const currencySymbol = language === 'ru' ? '₽' : '$';
    return `${currencySymbol}${amount.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  };

  const handleMouseMove = (event: React.MouseEvent, sliceType: string) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
    setHoveredSlice(sliceType);
  };

  const handleMouseLeave = () => {
    setHoveredSlice(null);
  };
  
  return (
    <div className="pie-chart-container" ref={containerRef}>
      <div className="pie-chart-title">{chartTitle}</div>
      <div className="pie-chart-content">
        <svg className="pie-chart-svg" viewBox="0 0 240 240">
          {/* Starting Amount slice */}
          <path
            d={createPieSlice(centerX, centerY, radius, currentAngle, currentAngle + startingAngle)}
            fill="#3b82f6"
            className="pie-slice pie-slice-starting"
            style={{transformOrigin: `${centerX}px ${centerY}px`}}
            onMouseMove={(e) => handleMouseMove(e, 'starting')}
            onMouseLeave={handleMouseLeave}
          />
          
          {/* Total Contributions slice */}
          {totalContributions > 0 && (
            <path
              d={createPieSlice(centerX, centerY, radius, currentAngle + startingAngle, currentAngle + startingAngle + contributionsAngle)}
              fill="#22c55e"
              className="pie-slice pie-slice-contributions"
              style={{transformOrigin: `${centerX}px ${centerY}px`}}
              onMouseMove={(e) => handleMouseMove(e, 'contributions')}
              onMouseLeave={handleMouseLeave}
            />
          )}
          
          {/* Interest slice */}
          <path
            d={createPieSlice(centerX, centerY, radius, 
              currentAngle + startingAngle + contributionsAngle, 
              currentAngle + startingAngle + contributionsAngle + interestAngle)}
            fill="#ef4444"
            className="pie-slice pie-slice-interest"
            style={{transformOrigin: `${centerX}px ${centerY}px`}}
            onMouseMove={(e) => handleMouseMove(e, 'interest')}
            onMouseLeave={handleMouseLeave}
          />
          

        </svg>
        
        <div className="pie-legend">
          <div className="pie-legend-item">
            <div className="pie-legend-color" style={{backgroundColor: '#3b82f6'}}></div>
            <span className="pie-legend-label">{t('compoundCalculator.resultsSection.pieChart.startingAmount')}</span>
            <span className="pie-legend-amount">{formatCurrency(startingAmount)}</span>
          </div>
          {totalContributions > 0 && (
            <div className="pie-legend-item">
              <div className="pie-legend-color" style={{backgroundColor: '#22c55e'}}></div>
              <span className="pie-legend-label">{t('compoundCalculator.resultsSection.pieChart.totalContributions')}</span>
              <span className="pie-legend-amount">{formatCurrency(totalContributions)}</span>
            </div>
          )}
          <div className="pie-legend-item">
            <div className="pie-legend-color" style={{backgroundColor: '#ef4444'}}></div>
            <span className="pie-legend-label">{t('compoundCalculator.resultsSection.pieChart.interest')}</span>
            <span className="pie-legend-amount">{formatCurrency(interest)}</span>
          </div>
        </div>
        
        {/* Floating tooltip */}
        {hoveredSlice && (
          <div 
            className="pie-tooltip-floating"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 10,
            }}
          >
            <div className="tooltip-title">
              {hoveredSlice === 'starting' && t('compoundCalculator.resultsSection.pieChart.startingAmount')}
              {hoveredSlice === 'contributions' && t('compoundCalculator.resultsSection.pieChart.totalContributions')}
              {hoveredSlice === 'interest' && t('compoundCalculator.resultsSection.pieChart.interest')}
            </div>
            <div className="tooltip-value">
              {hoveredSlice === 'starting' && `${formatCurrency(startingAmount)} (${startingPercentage.toFixed(1)}%)`}
              {hoveredSlice === 'contributions' && `${formatCurrency(totalContributions)} (${contributionsPercentage.toFixed(1)}%)`}
              {hoveredSlice === 'interest' && `${formatCurrency(interest)} (${interestPercentage.toFixed(1)}%)`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 