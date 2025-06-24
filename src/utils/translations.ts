// Import all translation files
import { headerTranslations } from '../components/Header/Header.i18n';
import { languageSwitcherTranslations } from '../components/LanguageSwitcher/LanguageSwitcher.i18n';
import { profileMenuTranslations } from '../components/ProfileMenu/ProfileMenu.i18n';
import { navigationTranslations } from '../app/navigation.i18n';
import { homeTranslations } from '../app/home.i18n';
import { lessonsTranslations } from '../app/lessons/lessons.i18n';
import { calculatorsTranslations } from '../app/calculators/calculators.i18n';
import { commonTranslations } from './common.i18n';

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
    'calculators.retirement': calculatorsTranslations[lang].retirement,
    'calculators.retirement.desc': calculatorsTranslations[lang].retirementDesc,
    'calculators.mortgage': calculatorsTranslations[lang].mortgage,
    'calculators.mortgage.desc': calculatorsTranslations[lang].mortgageDesc,
    'calculators.investment': calculatorsTranslations[lang].investment,
    'calculators.investment.desc': calculatorsTranslations[lang].investmentDesc,
    
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