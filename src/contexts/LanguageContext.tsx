'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/utils/i18n';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isClient, setIsClient] = useState(false);

  const changeLanguage = async (lang: string) => {
    if (!isClient) return; // Prevent server-side execution
    
    try {
      console.log('Changing language from', currentLanguage, 'to', lang);
      
      // Ensure i18n is initialized
      if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
        localStorage.setItem('language', lang);
        console.log('Language changed successfully to:', lang);
      } else {
        console.error('i18n is not properly initialized');
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  useEffect(() => {
    // Mark as client-side to prevent hydration mismatch
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Wait for i18n to be initialized
    const initializeLanguage = async () => {
      try {
        // Wait a bit for i18n to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (i18n && i18n.isInitialized) {
          setCurrentLanguage(i18n.language || 'en');
          
          // Set initial language from localStorage
          const savedLanguage = localStorage.getItem('language');
          if (savedLanguage && savedLanguage !== i18n.language) {
            console.log('Loading saved language:', savedLanguage);
            changeLanguage(savedLanguage);
          }

          // Listen for language changes
          const handleLanguageChange = (lng: string) => {
            console.log('Language changed event:', lng);
            setCurrentLanguage(lng);
            localStorage.setItem('language', lng);
          };

          if (typeof i18n.on === 'function') {
            i18n.on('languageChanged', handleLanguageChange);
            
            return () => {
              if (typeof i18n.off === 'function') {
                i18n.off('languageChanged', handleLanguageChange);
              }
            };
          }
        }
      } catch (error) {
        console.error('Error initializing language:', error);
      }
    };

    initializeLanguage();
  }, [isClient]);

  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 