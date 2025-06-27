// Import all translation files
import { headerTranslations } from '../components/Header/Header.i18n';
import { languageSwitcherTranslations } from '../components/LanguageSwitcher/LanguageSwitcher.i18n';
import { profileMenuTranslations } from '../components/ProfileMenu/ProfileMenu.i18n';
import { navigationTranslations } from '../app/navigation.i18n';
import { homeTranslations } from '../app/home.i18n';
import { lessonsTranslations } from '../app/lessons/lessons.i18n';
import { calculatorsTranslations } from '../app/calculators/calculators.i18n';
import { commonTranslations } from './common.i18n';
import { compoundInterestCalculatorTranslations } from '../components/calculators/CompoundInterestCalculator/CompoundInterestCalculator.i18n';

// Helper function to merge translations for a language
function mergeTranslations(lang: 'en' | 'ru') {
  return {
    // Header
    'header.title': headerTranslations[lang].title,
    'header.search.placeholder': headerTranslations[lang].search.placeholder,
    'header.profile.profile': headerTranslations[lang].profile.profile,
    'header.profile.settings': headerTranslations[lang].profile.settings,
    'header.profile.notifications': headerTranslations[lang].profile.notifications,
    'header.profile.help': headerTranslations[lang].profile.help,
    'header.profile.logout': headerTranslations[lang].profile.logout,
    
    // Navigation
    'nav.home': navigationTranslations[lang].home,
    'nav.lessons': navigationTranslations[lang].lessons,
    'nav.calculators': navigationTranslations[lang].calculators,
    
    // Home Page
    'home.welcome': homeTranslations[lang].welcome,
    'home.subtitle': homeTranslations[lang].subtitle,
    'home.features.calculators': homeTranslations[lang].features.calculators,
    'home.features.calculators.desc': homeTranslations[lang].features.calculatorsDesc,
    'home.features.lessons': homeTranslations[lang].features.lessons,
    'home.features.lessons.desc': homeTranslations[lang].features.lessonsDesc,
    'home.features.tracking': homeTranslations[lang].features.tracking,
    'home.features.tracking.desc': homeTranslations[lang].features.trackingDesc,
    'home.cta.start': homeTranslations[lang].cta.start,
    'home.cta.explore': homeTranslations[lang].cta.explore,
    
    // Lessons Page
    'lessons.title': lessonsTranslations[lang].title,
    'lessons.subtitle': lessonsTranslations[lang].subtitle,
    'lessons.difficulty.beginner': lessonsTranslations[lang].difficulty.beginner,
    'lessons.difficulty.intermediate': lessonsTranslations[lang].difficulty.intermediate,
    'lessons.difficulty.advanced': lessonsTranslations[lang].difficulty.advanced,
    'lessons.duration': lessonsTranslations[lang].duration,
    'lessons.watchVideo': lessonsTranslations[lang].watchVideo,
    
    // Calculators Page
    'calculators.title': calculatorsTranslations[lang].title,
    'calculators.subtitle': calculatorsTranslations[lang].subtitle,
    'calculators.comingSoon': calculatorsTranslations[lang].comingSoon,
    'calculators.compound': calculatorsTranslations[lang].compound,
    'calculators.compound.desc': calculatorsTranslations[lang].compoundDesc,
    'calculators.portfolio': calculatorsTranslations[lang].portfolio,
    'calculators.portfolio.desc': calculatorsTranslations[lang].portfolioDesc,
    'calculators.retirement': calculatorsTranslations[lang].retirement,
    'calculators.retirement.desc': calculatorsTranslations[lang].retirementDesc,
    'calculators.riskAssessment': calculatorsTranslations[lang].riskAssessment,
    'calculators.riskAssessment.desc': calculatorsTranslations[lang].riskAssessmentDesc,
    'calculators.mortgage': calculatorsTranslations[lang].mortgage,
    'calculators.mortgage.desc': calculatorsTranslations[lang].mortgageDesc,
    'calculators.emergencyFund': calculatorsTranslations[lang].emergencyFund,
    'calculators.emergencyFund.desc': calculatorsTranslations[lang].emergencyFundDesc,
    'calculators.debtPayoff': calculatorsTranslations[lang].debtPayoff,
    'calculators.debtPayoff.desc': calculatorsTranslations[lang].debtPayoffDesc,
    'calculators.savingsGoal': calculatorsTranslations[lang].savingsGoal,
    'calculators.savingsGoal.desc': calculatorsTranslations[lang].savingsGoalDesc,
    'calculators.netWorth': calculatorsTranslations[lang].netWorth,
    'calculators.netWorth.desc': calculatorsTranslations[lang].netWorthDesc,
    'calculators.investment': calculatorsTranslations[lang].investment,
    'calculators.investment.desc': calculatorsTranslations[lang].investmentDesc,
    'calculators.taxImpact': calculatorsTranslations[lang].taxImpact,
    'calculators.taxImpact.desc': calculatorsTranslations[lang].taxImpactDesc,
    'calculators.budgetPlanner': calculatorsTranslations[lang].budgetPlanner,
    'calculators.budgetPlanner.desc': calculatorsTranslations[lang].budgetPlannerDesc,
    
    // Compound Interest Calculator
    'compoundCalculator.title': compoundInterestCalculatorTranslations[lang].title,
    'compoundCalculator.description': compoundInterestCalculatorTranslations[lang].description,
    'compoundCalculator.backButton': compoundInterestCalculatorTranslations[lang].backButton,
    
    // Input Section
    'compoundCalculator.inputSection.title': compoundInterestCalculatorTranslations[lang].inputSection.title,
    'compoundCalculator.inputSection.startingAmount.label': compoundInterestCalculatorTranslations[lang].inputSection.startingAmount.label,
    'compoundCalculator.inputSection.startingAmount.info': compoundInterestCalculatorTranslations[lang].inputSection.startingAmount.info,
    'compoundCalculator.inputSection.investmentPeriod.label': compoundInterestCalculatorTranslations[lang].inputSection.investmentPeriod.label,
    'compoundCalculator.inputSection.investmentPeriod.info': compoundInterestCalculatorTranslations[lang].inputSection.investmentPeriod.info,
    'compoundCalculator.inputSection.investmentPeriod.suffix': compoundInterestCalculatorTranslations[lang].inputSection.investmentPeriod.suffix,
    'compoundCalculator.inputSection.returnRate.label': compoundInterestCalculatorTranslations[lang].inputSection.returnRate.label,
    'compoundCalculator.inputSection.returnRate.info': compoundInterestCalculatorTranslations[lang].inputSection.returnRate.info,
    'compoundCalculator.inputSection.compound.label': compoundInterestCalculatorTranslations[lang].inputSection.compound.label,
    'compoundCalculator.inputSection.compound.info': compoundInterestCalculatorTranslations[lang].inputSection.compound.info,
    'compoundCalculator.inputSection.compound.options.annually': compoundInterestCalculatorTranslations[lang].inputSection.compound.options.annually,
    'compoundCalculator.inputSection.compound.options.semiAnnually': compoundInterestCalculatorTranslations[lang].inputSection.compound.options.semiAnnually,
    'compoundCalculator.inputSection.compound.options.quarterly': compoundInterestCalculatorTranslations[lang].inputSection.compound.options.quarterly,
    'compoundCalculator.inputSection.compound.options.monthly': compoundInterestCalculatorTranslations[lang].inputSection.compound.options.monthly,
    'compoundCalculator.inputSection.compound.options.daily': compoundInterestCalculatorTranslations[lang].inputSection.compound.options.daily,
    'compoundCalculator.inputSection.regularContribution.label': compoundInterestCalculatorTranslations[lang].inputSection.regularContribution.label,
    'compoundCalculator.inputSection.regularContribution.info': compoundInterestCalculatorTranslations[lang].inputSection.regularContribution.info,
    'compoundCalculator.inputSection.contributionFrequency.label': compoundInterestCalculatorTranslations[lang].inputSection.contributionFrequency.label,
    'compoundCalculator.inputSection.contributionFrequency.info': compoundInterestCalculatorTranslations[lang].inputSection.contributionFrequency.info,
    'compoundCalculator.inputSection.contributionFrequency.options.none': compoundInterestCalculatorTranslations[lang].inputSection.contributionFrequency.options.none,
    'compoundCalculator.inputSection.contributionFrequency.options.monthly': compoundInterestCalculatorTranslations[lang].inputSection.contributionFrequency.options.monthly,
    'compoundCalculator.inputSection.contributionFrequency.options.quarterly': compoundInterestCalculatorTranslations[lang].inputSection.contributionFrequency.options.quarterly,
    'compoundCalculator.inputSection.contributionFrequency.options.annually': compoundInterestCalculatorTranslations[lang].inputSection.contributionFrequency.options.annually,
    'compoundCalculator.inputSection.contributionTiming.label': compoundInterestCalculatorTranslations[lang].inputSection.contributionTiming.label,
    'compoundCalculator.inputSection.contributionTiming.info': compoundInterestCalculatorTranslations[lang].inputSection.contributionTiming.info,
    'compoundCalculator.inputSection.contributionTiming.options.beginning': compoundInterestCalculatorTranslations[lang].inputSection.contributionTiming.options.beginning,
    'compoundCalculator.inputSection.contributionTiming.options.end': compoundInterestCalculatorTranslations[lang].inputSection.contributionTiming.options.end,
    
    // Results Section
    'compoundCalculator.resultsSection.title': compoundInterestCalculatorTranslations[lang].resultsSection.title,
    'compoundCalculator.resultsSection.finalAmount.label': compoundInterestCalculatorTranslations[lang].resultsSection.finalAmount.label,
    'compoundCalculator.resultsSection.finalAmount.description': compoundInterestCalculatorTranslations[lang].resultsSection.finalAmount.description,
    'compoundCalculator.resultsSection.pieChart.title': compoundInterestCalculatorTranslations[lang].resultsSection.pieChart.title,
    'compoundCalculator.resultsSection.pieChart.startingAmount': compoundInterestCalculatorTranslations[lang].resultsSection.pieChart.startingAmount,
    'compoundCalculator.resultsSection.pieChart.totalContributions': compoundInterestCalculatorTranslations[lang].resultsSection.pieChart.totalContributions,
    'compoundCalculator.resultsSection.pieChart.interest': compoundInterestCalculatorTranslations[lang].resultsSection.pieChart.interest,
    
    // Charts Section
    'compoundCalculator.chartsSection.title': compoundInterestCalculatorTranslations[lang].chartsSection.title,
    'compoundCalculator.chartsSection.growthChart.title': compoundInterestCalculatorTranslations[lang].chartsSection.growthChart.title,
    'compoundCalculator.chartsSection.growthChart.xAxisLabel': compoundInterestCalculatorTranslations[lang].chartsSection.growthChart.xAxisLabel,
    'compoundCalculator.chartsSection.growthChart.yAxisLabel': compoundInterestCalculatorTranslations[lang].chartsSection.growthChart.yAxisLabel,
    'compoundCalculator.chartsSection.growthChart.tooltipPrefix': compoundInterestCalculatorTranslations[lang].chartsSection.growthChart.tooltipPrefix,
    
    // Accumulation Schedule
    'compoundCalculator.accumulationSchedule.title': compoundInterestCalculatorTranslations[lang].accumulationSchedule.title,
    'compoundCalculator.accumulationSchedule.yearSelector.label': compoundInterestCalculatorTranslations[lang].accumulationSchedule.yearSelector.label,
    'compoundCalculator.accumulationSchedule.yearSelector.allYears': compoundInterestCalculatorTranslations[lang].accumulationSchedule.yearSelector.allYears,
    'compoundCalculator.accumulationSchedule.year': compoundInterestCalculatorTranslations[lang].accumulationSchedule.year,
    'compoundCalculator.accumulationSchedule.month': compoundInterestCalculatorTranslations[lang].accumulationSchedule.month,
    'compoundCalculator.accumulationSchedule.yearLabel': compoundInterestCalculatorTranslations[lang].accumulationSchedule.yearLabel,
    'compoundCalculator.accumulationSchedule.monthLabel': compoundInterestCalculatorTranslations[lang].accumulationSchedule.monthLabel,
    'compoundCalculator.accumulationSchedule.startingBalance': compoundInterestCalculatorTranslations[lang].accumulationSchedule.startingBalance,
    'compoundCalculator.accumulationSchedule.contribution': compoundInterestCalculatorTranslations[lang].accumulationSchedule.contribution,
    'compoundCalculator.accumulationSchedule.interest': compoundInterestCalculatorTranslations[lang].accumulationSchedule.interest,
    'compoundCalculator.accumulationSchedule.endingBalance': compoundInterestCalculatorTranslations[lang].accumulationSchedule.endingBalance,
    
    // Profile Menu
    'profile.stats.lessonsCompleted': profileMenuTranslations[lang].stats.lessonsCompleted,
    'profile.stats.hoursLearned': profileMenuTranslations[lang].stats.hoursLearned,
    'profile.stats.calculatorsUsed': profileMenuTranslations[lang].stats.calculatorsUsed,
    'profile.menu.profile': profileMenuTranslations[lang].menu.profile,
    'profile.menu.settings': profileMenuTranslations[lang].menu.settings,
    'profile.menu.notifications': profileMenuTranslations[lang].menu.notifications,
    'profile.menu.help': profileMenuTranslations[lang].menu.help,
    'profile.menu.logout': profileMenuTranslations[lang].menu.logout,
    
    // Language Switcher
    'language.english': languageSwitcherTranslations[lang].english,
    'language.russian': languageSwitcherTranslations[lang].russian,
    'language.switch': languageSwitcherTranslations[lang].switch,
    
    // Common
    'common.loading': commonTranslations[lang].loading,
    'common.error': commonTranslations[lang].error,
    'common.success': commonTranslations[lang].success,
    'common.cancel': commonTranslations[lang].cancel,
    'common.save': commonTranslations[lang].save,
    'common.close': commonTranslations[lang].close,
    'common.back': commonTranslations[lang].back,
    'common.next': commonTranslations[lang].next,
    'common.previous': commonTranslations[lang].previous,
    'common.submit': commonTranslations[lang].submit,
    'common.delete': commonTranslations[lang].delete,
    'common.edit': commonTranslations[lang].edit,
    'common.view': commonTranslations[lang].view,
    'common.search': commonTranslations[lang].search,
    'common.filter': commonTranslations[lang].filter,
    'common.sort': commonTranslations[lang].sort,
    'common.clear': commonTranslations[lang].clear,
  };
}

// Export combined translations
export const translations = {
  en: {
    translation: mergeTranslations('en'),
  },
  ru: {
    translation: mergeTranslations('ru'),
  },
}; 