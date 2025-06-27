import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './AccumulationSchedule.css';

interface ScheduleData {
  year: number;
  month?: number;
  startingBalance: number;
  contribution: number;
  interest: number;
  endingBalance: number;
}

interface AccumulationScheduleProps {
  annualData: ScheduleData[];
  monthlyData: ScheduleData[];
  formatCurrency: (amount: number) => string;
  title?: string;
}

export function AccumulationSchedule({ 
  annualData, 
  monthlyData, 
  formatCurrency, 
  title 
}: AccumulationScheduleProps) {
  const { t } = useLanguage();
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

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
    return monthlyData.filter(row => row.year === year);
  };

  const scheduleTitle = title || t('compoundCalculator.accumulationSchedule.title');

  return (
    <div className="accumulation-schedule">
      <div className="section-header">
        <h3>{scheduleTitle}</h3>
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
              const monthlyDataForYear = getMonthlyDataForYear(yearRow.year);
              const hasMonthlyData = monthlyDataForYear.length > 0;

              return (
                <React.Fragment key={`year-group-${yearRow.year}`}>
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
                  {isExpanded && monthlyDataForYear.map((monthRow, monthIndex) => (
                    <tr key={`month-${yearRow.year}-${monthRow.month}`} className="monthly-details">
                      <td>{t('compoundCalculator.accumulationSchedule.monthLabel')} {monthRow.month}</td>
                      <td>{formatCurrency(monthRow.startingBalance)}</td>
                      <td>{formatCurrency(monthRow.contribution)}</td>
                      <td>{formatCurrency(monthRow.interest)}</td>
                      <td>{formatCurrency(monthRow.endingBalance)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 