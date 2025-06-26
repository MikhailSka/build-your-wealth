import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './CompoundInterestCalculator.css';

interface CompoundInterestCalculatorProps {
  onBack: () => void;
}

export function CompoundInterestCalculator({ onBack }: CompoundInterestCalculatorProps) {
  const { t, language } = useLanguage();
  const [startingAmount, setStartingAmount] = useState<string>('10000');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('10');
  const [returnRate, setReturnRate] = useState<string>('7');
  const [compound, setCompound] = useState<string>('12');
  const [regularContribution, setRegularContribution] = useState<string>('500');
  const [contributionFrequency, setContributionFrequency] = useState<string>('12');
  const [contributionTiming, setContributionTiming] = useState<string>('end');
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [results, setResults] = useState({
    finalAmount: 0,
    totalInterest: 0,
    totalContributions: 0,
    totalRegularContributions: 0
  });
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [monthlyScheduleData, setMonthlyScheduleData] = useState<any[]>([]);

  const calculateCompoundInterest = () => {
    const P = parseFloat(startingAmount) || 0;
    const PMT = parseFloat(regularContribution) || 0;
    const r = (parseFloat(returnRate) || 0) / 100;
    const n = parseFloat(compound) || 1;
    const contributionFreq = parseFloat(contributionFrequency) || 0;
    const years = parseFloat(investmentPeriod) || 0;
    const isBeginning = contributionTiming === 'beginning';

    const schedule = [];
    const monthlySchedule = [];
    let currentBalance = P;
    let totalContributions = P;
    let totalRegularContributions = 0;

    // Year 0
    schedule.push({
      year: 0,
      startingBalance: 0,
      contribution: P,
      interest: 0,
      endingBalance: P
    });

    for (let year = 1; year <= years; year++) {
      const yearStartBalance = currentBalance;
      let yearContributions = 0;
      let yearInterest = 0;

      if (contributionFreq > 0) {
        const periodsPerYear = contributionFreq;
        const ratePerPeriod = r / periodsPerYear;
        
        for (let period = 1; period <= periodsPerYear; period++) {
          const monthStartBalance = currentBalance;
          let periodContribution = 0;
          let periodInterest = 0;

          if (isBeginning) {
            // Add contribution at beginning of period
            currentBalance += PMT;
            periodContribution = PMT;
            yearContributions += PMT;
            totalRegularContributions += PMT;
            
            // Then apply interest for the period
            periodInterest = currentBalance * ratePerPeriod;
            currentBalance += periodInterest;
            yearInterest += periodInterest;
          } else {
            // Apply interest first
            periodInterest = currentBalance * ratePerPeriod;
            currentBalance += periodInterest;
            yearInterest += periodInterest;
            
            // Then add contribution at end of period
            currentBalance += PMT;
            periodContribution = PMT;
            yearContributions += PMT;
            totalRegularContributions += PMT;
          }

          // Add to monthly schedule if monthly contributions
          if (contributionFreq === 12) {
            monthlySchedule.push({
              year,
              month: period,
              startingBalance: monthStartBalance,
              contribution: periodContribution,
              interest: periodInterest,
              endingBalance: currentBalance
            });
          }
        }
      } else {
        // No contributions, just compound interest
        const annualInterest = currentBalance * r;
        currentBalance += annualInterest;
        yearInterest = annualInterest;
      }

      totalContributions += yearContributions;

      schedule.push({
        year,
        startingBalance: yearStartBalance,
        contribution: yearContributions,
        interest: yearInterest,
        endingBalance: currentBalance
      });
    }

    const finalAmount = currentBalance;
    const totalInterest = finalAmount - totalContributions;

    setResults({
      finalAmount,
      totalInterest,
      totalContributions,
      totalRegularContributions
    });

    setScheduleData(schedule);
    setMonthlyScheduleData(monthlySchedule);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [startingAmount, investmentPeriod, returnRate, compound, regularContribution, contributionFrequency, contributionTiming]);

  const formatCurrency = (amount: number) => {
    const locale = language === 'ru' ? 'ru-RU' : 'en-US';
    const currency = language === 'ru' ? 'RUB' : 'USD';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const InfoButton = ({ text }: { text: string }) => (
    <div className="info-button">
      <Info size={12} />
      <div className="info-tooltip">{text}</div>
    </div>
  );

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

  // Pie chart component
  const PieChart = () => {
    const totalAmount = results.finalAmount;
    const initialAmount = parseFloat(startingAmount) || 0;
    const regularContributionsAmount = results.totalRegularContributions;
    const interestAmount = results.totalInterest;
    
    if (totalAmount === 0) return null;
    
    const initialPercentage = (initialAmount / totalAmount) * 100;
    const regularPercentage = (regularContributionsAmount / totalAmount) * 100;
    const interestPercentage = (interestAmount / totalAmount) * 100;
    
    // Calculate angles for pie slices
    const initialAngle = (initialPercentage / 100) * 360;
    const regularAngle = (regularPercentage / 100) * 360;
    const interestAngle = (interestPercentage / 100) * 360;
    
    const centerX = 120;
    const centerY = 120;
    const radius = 100;
    
    let currentAngle = 0;
    
    return (
      <div className="pie-chart-container">
        <div className="pie-chart-title">{t('compoundCalculator.resultsSection.pieChart.title')}</div>
        <div className="pie-chart-content">
          <svg className="pie-chart-svg" viewBox="0 0 240 240">
            {/* Starting Amount slice */}
            <path
              d={createPieSlice(centerX, centerY, radius, currentAngle, currentAngle + initialAngle)}
              fill="#3b82f6"
              className="pie-slice pie-slice-starting"
              style={{transformOrigin: `${centerX}px ${centerY}px`}}
            />
            
            {/* Regular Contributions slice */}
            {regularContributionsAmount > 0 && (
              <path
                d={createPieSlice(centerX, centerY, radius, currentAngle + initialAngle, currentAngle + initialAngle + regularAngle)}
                fill="#22c55e"
                className="pie-slice pie-slice-contributions"
                style={{transformOrigin: `${centerX}px ${centerY}px`}}
              />
            )}
            
            {/* Interest slice */}
            <path
              d={createPieSlice(centerX, centerY, radius, 
                currentAngle + initialAngle + regularAngle, 
                currentAngle + initialAngle + regularAngle + interestAngle)}
              fill="#ef4444"
              className="pie-slice pie-slice-interest"
              style={{transformOrigin: `${centerX}px ${centerY}px`}}
            />
          </svg>
          
          <div className="pie-legend">
            <div className="pie-legend-item">
              <div className="pie-legend-color" style={{backgroundColor: '#3b82f6'}}></div>
              <span>{t('compoundCalculator.resultsSection.pieChart.startingAmount')} {initialPercentage.toFixed(0)}%</span>
            </div>
            {regularContributionsAmount > 0 && (
              <div className="pie-legend-item">
                <div className="pie-legend-color" style={{backgroundColor: '#22c55e'}}></div>
                <span>{t('compoundCalculator.resultsSection.pieChart.totalContributions')} {regularPercentage.toFixed(0)}%</span>
              </div>
            )}
            <div className="pie-legend-item">
              <div className="pie-legend-color" style={{backgroundColor: '#ef4444'}}></div>
              <span>{t('compoundCalculator.resultsSection.pieChart.interest')} {interestPercentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Stacked bar chart component
  const StackedBarChart = () => {
    const data = scheduleData.slice(1); // Skip year 0
    const maxAmount = Math.max(...data.map(d => d.endingBalance));
    const years = data.length;
    
    if (data.length === 0) return null;
    
    const width = 800;
    const height = 380;
    const padding = { top: 20, right: 40, bottom: 60, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const barWidth = chartWidth / years * 0.7;
    const barSpacing = chartWidth / years;
    
    return (
      <div className="chart-container">
        <div className="chart-title">{t('compoundCalculator.chartsSection.growthChart.title')}</div>
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
            {[0, 0.25, 0.5, 0.75, 1].map(fraction => {
              const value = maxAmount * fraction;
              const y = height - padding.bottom - (fraction * chartHeight);
              return (
                <text
                  key={fraction}
                  x={padding.left - 10}
                  y={y + 4}
                  className="chart-y-label"
                >
                  {formatCurrency(value)}
                </text>
              );
            })}
            
            {/* Bars */}
            {data.map((d, i) => {
              const x = padding.left + i * barSpacing + (barSpacing - barWidth) / 2;
              const startingAmountHeight = (parseFloat(startingAmount) / maxAmount) * chartHeight;
              const contributionsHeight = (d.contribution * (i + 1) / maxAmount) * chartHeight;
              const interestHeight = ((d.endingBalance - parseFloat(startingAmount) - d.contribution * (i + 1)) / maxAmount) * chartHeight;
              
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
              className="chart-label" 
              style={{fontWeight: '500', textAnchor: 'middle', fontSize: '0.875rem', fill: 'var(--text-primary)'}}
            >
              {t('compoundCalculator.chartsSection.growthChart.xAxisLabel')}
            </text>
            <text 
              x={20} 
              y={height/2} 
              className="chart-label" 
              style={{fontWeight: '500', textAnchor: 'middle', fontSize: '0.875rem', fill: 'var(--text-primary)'}} 
              transform={`rotate(-90 20 ${height/2})`}
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
        </div>
      </div>
    );
  };

  // Get contribution timing label based on frequency
  const getContributionTimingLabel = () => {
    const freq = parseFloat(contributionFrequency);
    if (freq === 12) return 'month';
    if (freq === 4) return 'quarter';
    if (freq === 1) return 'year';
    return 'period';
  };

  // Accumulation Schedule Table
  const AccumulationSchedule = () => {
    const toggleYear = (year: number) => {
      const newExpandedYears = new Set(expandedYears);
      if (newExpandedYears.has(year)) {
        newExpandedYears.delete(year);
      } else {
        newExpandedYears.add(year);
      }
      setExpandedYears(newExpandedYears);
    };

    const getMonthlyDataForYear = (year: number) => {
      return monthlyScheduleData.filter(row => row.year === year);
    };

    const annualData = scheduleData.slice(1); // Skip year 0
    
    return (
      <div className="accumulation-schedule">
        <div className="section-header">
          <h3>{t('compoundCalculator.accumulationSchedule.title')}</h3>
        </div>
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>{t('compoundCalculator.accumulationSchedule.year')}</th>
                <th>{t('compoundCalculator.accumulationSchedule.startingBalance')}</th>
                <th>{t('compoundCalculator.accumulationSchedule.contribution')}</th>
                <th>{t('compoundCalculator.accumulationSchedule.interest')}</th>
                <th>{t('compoundCalculator.accumulationSchedule.endingBalance')}</th>
              </tr>
            </thead>
            <tbody>
              {annualData.map((yearRow, yearIndex) => {
                const isExpanded = expandedYears.has(yearRow.year);
                const monthlyData = getMonthlyDataForYear(yearRow.year);
                const hasMonthlyData = monthlyData.length > 0;

                return (
                  <>
                    {/* Annual row */}
                    <tr 
                      key={`year-${yearRow.year}`} 
                      className={hasMonthlyData ? `expandable-row ${isExpanded ? 'expanded' : ''}` : ''}
                      onClick={hasMonthlyData ? () => toggleYear(yearRow.year) : undefined}
                    >
                      <td>
                        {hasMonthlyData && (
                          <ChevronDown size={14} className="expand-icon" />
                        )}
                        {t('compoundCalculator.accumulationSchedule.yearLabel')} {yearRow.year}
                      </td>
                      <td>{formatCurrency(yearRow.startingBalance)}</td>
                      <td>{formatCurrency(yearRow.contribution)}</td>
                      <td>{formatCurrency(yearRow.interest)}</td>
                      <td>{formatCurrency(yearRow.endingBalance)}</td>
                    </tr>

                    {/* Monthly details */}
                    {isExpanded && monthlyData.map((monthRow, monthIndex) => (
                      <tr key={`month-${yearRow.year}-${monthRow.month}`} className="monthly-details">
                        <td>{t('compoundCalculator.accumulationSchedule.monthLabel')} {monthRow.month}</td>
                        <td>{formatCurrency(monthRow.startingBalance)}</td>
                        <td>{formatCurrency(monthRow.contribution)}</td>
                        <td>{formatCurrency(monthRow.interest)}</td>
                        <td>{formatCurrency(monthRow.endingBalance)}</td>
                      </tr>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          <span>{t('compoundCalculator.backButton')}</span>
        </button>
        <h1>{t('compoundCalculator.title')}</h1>
        <p>{t('compoundCalculator.description')}</p>
      </div>

      <div className="calculator-content">
        <div className="calculator-inputs">
          <div className="input-section">
            <div className="section-header">
              <h3>{t('compoundCalculator.inputSection.title')}</h3>
            </div>
            
            {/* Starting Amount */}
            <div className="input-group">
              <div className="input-group-header">
                <label htmlFor="startingAmount">{t('compoundCalculator.inputSection.startingAmount.label')}</label>
                <InfoButton text={t('compoundCalculator.inputSection.startingAmount.info')} />
              </div>
              <div className="input-wrapper">
                <input
                  id="startingAmount"
                  type="number"
                  value={startingAmount}
                  onChange={(e) => setStartingAmount(e.target.value)}
                  min="0"
                  step="100"
                  className="has-suffix"
                />
                <span className="input-suffix">{language === 'ru' ? '₽' : '$'}</span>
              </div>
            </div>

            {/* Investment Period */}
            <div className="input-group">
              <div className="input-group-header">
                <label htmlFor="investmentPeriod">{t('compoundCalculator.inputSection.investmentPeriod.label')}</label>
                <InfoButton text={t('compoundCalculator.inputSection.investmentPeriod.info')} />
              </div>
              <div className="input-wrapper">
                <input
                  id="investmentPeriod"
                  type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Math.round(parseFloat(e.target.value) || 0).toString())}
                  min="1"
                  max="50"
                  step="1"
                  className="has-suffix"
                />
                <span className="input-suffix">years</span>
              </div>
            </div>

            {/* Return Rate */}
            <div className="input-group">
              <div className="input-group-header">
                <label htmlFor="returnRate">{t('compoundCalculator.inputSection.returnRate.label')}</label>
                <InfoButton text={t('compoundCalculator.inputSection.returnRate.info')} />
              </div>
              <div className="input-wrapper">
                <input
                  id="returnRate"
                  type="number"
                  value={returnRate}
                  onChange={(e) => setReturnRate(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                  className="has-suffix"
                />
                <span className="input-suffix">%</span>
              </div>
            </div>

            {/* Compound */}
            <div className="input-group">
              <div className="input-group-header">
                <label htmlFor="compound">{t('compoundCalculator.inputSection.compound.label')}</label>
                <InfoButton text={t('compoundCalculator.inputSection.compound.info')} />
              </div>
              <div className="input-wrapper">
                <select
                  id="compound"
                  value={compound}
                  onChange={(e) => setCompound(e.target.value)}
                >
                  <option value="1">{t('compoundCalculator.inputSection.compound.options.annually')}</option>
                  <option value="2">{t('compoundCalculator.inputSection.compound.options.semiAnnually')}</option>
                  <option value="4">{t('compoundCalculator.inputSection.compound.options.quarterly')}</option>
                  <option value="12">{t('compoundCalculator.inputSection.compound.options.monthly')}</option>
                  <option value="365">{t('compoundCalculator.inputSection.compound.options.daily')}</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>

            {/* Regular Contribution */}
            <div className="input-group">
              <div className="input-group-header">
                <label htmlFor="regularContribution">{t('compoundCalculator.inputSection.regularContribution.label')}</label>
                <InfoButton text={t('compoundCalculator.inputSection.regularContribution.info')} />
              </div>
              <div className="input-wrapper">
                <input
                  id="regularContribution"
                  type="number"
                  value={regularContribution}
                  onChange={(e) => setRegularContribution(e.target.value)}
                  min="0"
                  step="50"
                  className="has-suffix"
                />
                <span className="input-suffix">{language === 'ru' ? '₽' : '$'}</span>
              </div>
            </div>

            {/* Contribution Frequency */}
            <div className="input-group">
              <div className="input-group-header">
                <label htmlFor="contributionFrequency">{t('compoundCalculator.inputSection.contributionFrequency.label')}</label>
                <InfoButton text={t('compoundCalculator.inputSection.contributionFrequency.info')} />
              </div>
              <div className="input-wrapper">
                <select
                  id="contributionFrequency"
                  value={contributionFrequency}
                  onChange={(e) => setContributionFrequency(e.target.value)}
                >
                  <option value="0">{t('compoundCalculator.inputSection.contributionFrequency.options.none')}</option>
                  <option value="12">{t('compoundCalculator.inputSection.contributionFrequency.options.monthly')}</option>
                  <option value="4">{t('compoundCalculator.inputSection.contributionFrequency.options.quarterly')}</option>
                  <option value="1">{t('compoundCalculator.inputSection.contributionFrequency.options.annually')}</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>

            {/* Contribution Timing */}
            {parseFloat(contributionFrequency) > 0 && (
              <div className="input-group">
                <div className="input-group-header">
                  <label htmlFor="contributionTiming">{t('compoundCalculator.inputSection.contributionTiming.label')} {getContributionTimingLabel()}</label>
                  <InfoButton text={t('compoundCalculator.inputSection.contributionTiming.info')} />
                </div>
                <div className="input-wrapper">
                  <select
                    id="contributionTiming"
                    value={contributionTiming}
                    onChange={(e) => setContributionTiming(e.target.value)}
                  >
                    <option value="beginning">{t('compoundCalculator.inputSection.contributionTiming.options.beginning')}</option>
                    <option value="end">{t('compoundCalculator.inputSection.contributionTiming.options.end')}</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="calculator-results">
          <div className="results-section">
            <div className="section-header">
              <h3>{t('compoundCalculator.resultsSection.title')}</h3>
            </div>
            
            <div className="result-card primary">
              <div className="result-label">{t('compoundCalculator.resultsSection.finalAmount.label')}</div>
              <div className="result-value">{formatCurrency(results.finalAmount)}</div>
            </div>

            {/* Pie Chart in Results Section */}
            <PieChart />
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="section-header">
            <h3>{t('compoundCalculator.chartsSection.title')}</h3>
          </div>
          <div className="charts-grid">
            <StackedBarChart />
          </div>
        </div>

        {/* Accumulation Schedule */}
        <AccumulationSchedule />
      </div>
    </div>
  );
} 