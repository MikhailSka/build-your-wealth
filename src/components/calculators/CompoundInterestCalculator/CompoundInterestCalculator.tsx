import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InfoButton, PieChart, StackedBarChart, AccumulationSchedule } from '@/components';
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

  // Prepare data for PieChart component
  const pieChartData = {
    startingAmount: parseFloat(startingAmount) || 0,
    totalContributions: results.totalRegularContributions,
    interest: results.totalInterest,
    totalAmount: results.finalAmount
  };

  // Prepare data for StackedBarChart component
  const stackedBarData = scheduleData.map(item => ({
    year: item.year,
    startingAmount: parseFloat(startingAmount) || 0,
    contribution: item.contribution,
    endingBalance: item.endingBalance
  }));

  // Get contribution timing label based on frequency
  const getContributionTimingLabel = () => {
    const freq = parseFloat(contributionFrequency);
    if (freq === 12) return 'month';
    if (freq === 4) return 'quarter';
    if (freq === 1) return 'year';
    return 'period';
  };

  // Prepare data for AccumulationSchedule component
  const annualScheduleData = scheduleData.slice(1).map(item => ({
    year: item.year,
    month: undefined,
    startingBalance: item.startingBalance,
    contribution: item.contribution,
    interest: item.interest,
    endingBalance: item.endingBalance
  }));

  const monthlyScheduleDataFormatted = monthlyScheduleData.map(item => ({
    year: item.year,
    month: item.month,
    startingBalance: item.startingBalance,
    contribution: item.contribution,
    interest: item.interest,
    endingBalance: item.endingBalance
  }));

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
                <span className="input-suffix">{t('compoundCalculator.inputSection.investmentPeriod.suffix')}</span>
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
            <PieChart data={pieChartData} />
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="section-header">
            <h3>{t('compoundCalculator.chartsSection.title')}</h3>
          </div>
          <div className="charts-grid">
            <StackedBarChart 
              data={stackedBarData} 
              formatCurrency={formatCurrency} 
              startingAmount={parseFloat(startingAmount) || 0}
            />
          </div>
        </div>

        {/* Accumulation Schedule */}
        <AccumulationSchedule 
          annualData={annualScheduleData}
          monthlyData={monthlyScheduleDataFormatted}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
} 