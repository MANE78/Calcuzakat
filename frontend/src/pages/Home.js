import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calculator, Shield, Users, Save, ArrowRight, Coins, TrendingUp } from 'lucide-react';

const Home = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: Calculator,
      title: t('feature1Title', language),
      description: t('feature1Desc', language),
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: Shield,
      title: t('feature2Title', language),
      description: t('feature2Desc', language),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Users,
      title: t('feature3Title', language),
      description: t('feature3Desc', language),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Save,
      title: t('feature4Title', language),
      description: t('feature4Desc', language),
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const zakatTypes = [
    { name: t('moneyZakat', language), icon: Coins, color: 'bg-green-500' },
    { name: t('goldSilverZakat', language), icon: TrendingUp, color: 'bg-yellow-500' },
    { name: t('tradeZakat', language), icon: Calculator, color: 'bg-blue-500' },
    { name: t('agricultureZakat', language), icon: Users, color: 'bg-emerald-500' },
    { name: t('livestockZakat', language), icon: Shield, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-6 leading-tight">
            {t('title', language)}
          </h1>
          <p className="text-xl text-emerald-700 mb-8 leading-relaxed">
            {t('subtitle', language)}
          </p>
          <Link to="/calculator">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              {t('startCalculating', language)}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Zakat Types */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-12">
          أنواع الزكاة المدعومة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {zakatTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-emerald-100">
              <CardContent className="p-6 text-center">
                <div className={`${type.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-emerald-800">{type.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-12">
          {t('features', language)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-emerald-100">
              <CardHeader className="text-center">
                <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-emerald-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('aboutZakat', language)}</h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            {t('zakatInfo', language)}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">{t('contact', language)}</h3>
          <p className="mb-2">{t('email', language)}: info@zakat-calculator.com</p>
          <p>{t('phone', language)}: +966 50 123 4567</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;