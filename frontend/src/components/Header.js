import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import { Button } from './ui/button';
import { Calculator, Home, History, Globe } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('home', language), icon: Home },
    { path: '/calculator', label: t('calculator', language), icon: Calculator },
    { path: '/history', label: t('history', language), icon: History }
  ];

  return (
    <header className="bg-white shadow-lg border-b-2 border-emerald-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 text-white p-2 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-800">
              {t('title', language)}
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <Button 
            onClick={toggleLanguage}
            variant="outline"
            className="flex items-center space-x-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;