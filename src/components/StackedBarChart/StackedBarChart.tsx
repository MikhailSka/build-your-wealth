import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import './StackedBarChart.css';

interface StackedBarData {
  year: number;
  startingAmount: number;
  contribution: number;
  endingBalance: number;
}

interface StackedBarChartProps {
  data: StackedBarData[];
  title?: string;
  formatCurrency: (amount: number) => string;
  startingAmount: number;
}

export function StackedBarChart({ data, title, formatCurrency, startingAmount }: StackedBarChartProps) {
  const { t } = useLanguage();
  const [hoveredBar, setHoveredBar] = useState<{ year: number; section: string } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const chartData = data.slice(1); // Skip year 0
  const maxAmount = Math.max(...chartData.map(d => d.endingBalance));
  const years = chartData.length;
  
  if (chartData.length === 0) return null;
  
  // Responsive dimensions
  const width = isMobile ? 370 : 820;
  const height = isMobile ? 300 : 400;
  const padding = isMobile 
    ? { top: 35, right: 20, bottom: 50, left: 70 }
    : { top: 40, right: 40, bottom: 60, left: 90 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const barWidth = chartWidth / years * 0.7;
  const barSpacing = chartWidth / years;
  
  const chartTitle = title || t('compoundCalculator.chartsSection.growthChart.title');
  
  const handleMouseMove = (event: React.MouseEvent, year: number, section: string) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
    setHoveredBar({ year, section });
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  const getTooltipData = (year: number, section: string) => {
    const yearData = chartData.find(d => d.year === year);
    if (!yearData) return null;
    
    const totalContributions = yearData.contribution * year;
    const totalInterest = yearData.endingBalance - startingAmount - totalContributions;
    
    switch (section) {
      case 'starting':
        return {
          title: t('compoundCalculator.resultsSection.pieChart.startingAmount'),
          value: formatCurrency(startingAmount)
        };
      case 'contributions':
        return {
          title: t('compoundCalculator.resultsSection.pieChart.totalContributions'),
          value: formatCurrency(totalContributions)
        };
      case 'interest':
        return {
          title: t('compoundCalculator.resultsSection.pieChart.interest'),
          value: formatCurrency(totalInterest)
        };
      default:
        return null;
    }
  };
  
  return (
    <div className="chart-container" ref={containerRef}>
      <div className="chart-title">{chartTitle}</div>
      <div className="chart-wrapper">
        <svg className="stacked-bar-chart" viewBox={`0 0 ${width} ${height}`}>
          {/* Y-axis */}
          <line 
            x1={padding.left} 
            y1={padding.top} 
            x2={padding.left} 
            y2={height - padding.bottom} 
            className="chart-y-axis" 
          />
          
          {/* X-axis */}
          <line 
            x1={padding.left} 
            y1={height - padding.bottom} 
            x2={width - padding.right} 
            y2={height - padding.bottom} 
            className="chart-x-axis" 
          />
          
          {/* Y-axis labels */}
          {(isMobile ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1]).map(fraction => {
            const value = maxAmount * fraction;
            const y = height - padding.bottom - (fraction * chartHeight);
            return (
              <text
                key={fraction}
                x={padding.left - (isMobile ? 5 : 8)}
                y={y + 4}
                className="chart-y-label"
              >
                {formatCurrency(value)}
              </text>
            );
          })}
          
          {/* Bars */}
          {chartData.map((d, i) => {
            const x = padding.left + i * barSpacing + (barSpacing - barWidth) / 2;
            const startingAmountHeight = (startingAmount / maxAmount) * chartHeight;
            const contributionsHeight = (d.contribution * (i + 1) / maxAmount) * chartHeight;
            const interestHeight = ((d.endingBalance - startingAmount - d.contribution * (i + 1)) / maxAmount) * chartHeight;
            
            return (
              <g key={i} className="bar-group">
                {/* Starting Amount */}
                <rect
                  x={x}
                  y={height - padding.bottom - startingAmountHeight}
                  width={barWidth}
                  height={startingAmountHeight}
                  fill="#3b82f6"
                  className="bar-section"
                  onMouseMove={(e) => handleMouseMove(e, d.year, 'starting')}
                  onMouseLeave={handleMouseLeave}
                />
                
                {/* Contributions */}
                {contributionsHeight > 0 && (
                  <rect
                    x={x}
                    y={height - padding.bottom - startingAmountHeight - contributionsHeight}
                    width={barWidth}
                    height={contributionsHeight}
                    fill="#22c55e"
                    className="bar-section"
                    onMouseMove={(e) => handleMouseMove(e, d.year, 'contributions')}
                    onMouseLeave={handleMouseLeave}
                  />
                )}
                
                {/* Interest */}
                {interestHeight > 0 && (
                  <rect
                    x={x}
                    y={height - padding.bottom - startingAmountHeight - contributionsHeight - interestHeight}
                    width={barWidth}
                    height={interestHeight}
                    fill="#ef4444"
                    className="bar-section"
                    onMouseMove={(e) => handleMouseMove(e, d.year, 'interest')}
                    onMouseLeave={handleMouseLeave}
                  />
                )}
                
                {/* X-axis label */}
                <text
                  x={x + barWidth / 2}
                  y={height - padding.bottom + 20}
                  className="chart-x-label"
                >
                  {d.year}
                </text>
              </g>
            );
          })}
          
          {/* Axis labels */}
          <text 
            x={width/2} 
            y={height - 15} 
            className="chart-label chart-x-axis-label" 
            style={{fontWeight: '500', textAnchor: 'middle', fontSize: isMobile ? '0.75rem' : '0.875rem', fill: 'var(--text-primary)'}}
          >
            {t('compoundCalculator.chartsSection.growthChart.xAxisLabel')}
          </text>
          <text 
            x={isMobile ? 15 : 20} 
            y={isMobile ? 15 : 20} 
            className="chart-label chart-y-axis-label" 
            style={{fontWeight: '500', textAnchor: 'start', fontSize: isMobile ? '0.75rem' : '0.875rem', fill: 'var(--text-primary)'}}
          >
            {t('compoundCalculator.chartsSection.growthChart.yAxisLabel')}
          </text>
        </svg>
        
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: '#3b82f6'}}></div>
            <span>{t('compoundCalculator.resultsSection.pieChart.startingAmount')}</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: '#22c55e'}}></div>
            <span>{t('compoundCalculator.resultsSection.pieChart.totalContributions')}</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{backgroundColor: '#ef4444'}}></div>
            <span>{t('compoundCalculator.resultsSection.pieChart.interest')}</span>
          </div>
        </div>
        
        {/* Floating tooltip */}
        {hoveredBar && (
          <div 
            className="chart-tooltip-floating"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 10,
            }}
          >
            {(() => {
              const tooltipData = getTooltipData(hoveredBar.year, hoveredBar.section);
              return tooltipData ? (
                <>
                  <div className="tooltip-title">{tooltipData.title}</div>
                  <div className="tooltip-value">{tooltipData.value}</div>
                  <div className="tooltip-year">{t('compoundCalculator.chartsSection.growthChart.tooltipPrefix')} {hoveredBar.year}</div>
                </>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
} 