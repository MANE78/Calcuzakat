import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [direction, setDirection] = useState('rtl');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    setDirection(prev => prev === 'rtl' ? 'ltr' : 'rtl');
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage }}>
      <div dir={direction} className={`font-${language === 'ar' ? 'arabic' : 'english'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};