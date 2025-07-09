import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { mockData } from '../data/mockData';
import { History as HistoryIcon, Trash2, Calendar, DollarSign } from 'lucide-react';

const History = () => {
  const { language } = useLanguage();
  const [calculations, setCalculations] = useState(mockData.calculations);

  const getZakatTypeLabel = (type) => {
    const labels = {
      money: t('moneyZakat', language),
      goldSilver: t('goldSilverZakat', language),
      trade: t('tradeZakat', language),
      agriculture: t('agricultureZakat', language),
      livestock: t('livestockZakat', language)
    };
    return labels[type] || type;
  };

  const getZakatTypeBadgeColor = (type) => {
    const colors = {
      money: 'bg-emerald-100 text-emerald-800',
      goldSilver: 'bg-yellow-100 text-yellow-800',
      trade: 'bg-blue-100 text-blue-800',
      agriculture: 'bg-green-100 text-green-800',
      livestock: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const deleteCalculation = (id) => {
    setCalculations(prev => prev.filter(calc => calc.id !== id));
    // In real app, this would be an API call
    mockData.calculations = calculations.filter(calc => calc.id !== id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4 flex items-center justify-center">
            <HistoryIcon className="mr-3 w-10 h-10" />
            {t('calculationHistory', language)}
          </h1>
          <p className="text-emerald-600 text-lg">
            مراجعة حساباتك السابقة للزكاة
          </p>
        </div>

        {calculations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl text-gray-300 mb-4">
                <HistoryIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {t('noHistory', language)}
              </h3>
              <p className="text-gray-500 mb-6">
                ابدأ بحساب الزكاة لرؤية سجل حساباتك هنا
              </p>
              <Button 
                onClick={() => window.location.href = '/calculator'}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t('startCalculating', language)}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">إجمالي الحسابات</h3>
                      <p className="text-3xl font-bold">{calculations.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">إجمالي الزكاة</h3>
                      <p className="text-3xl font-bold">
                        {calculations.reduce((sum, calc) => sum + (calc.result?.zakat || 0), 0).toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">آخر حساب</h3>
                      <p className="text-lg font-semibold">
                        {calculations.length > 0 ? formatDate(calculations[calculations.length - 1].date) : 'لا يوجد'}
                      </p>
                    </div>
                    <HistoryIcon className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HistoryIcon className="mr-2 w-5 h-5" />
                  سجل الحسابات المفصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">{t('date', language)}</TableHead>
                        <TableHead className="text-right">{t('type', language)}</TableHead>
                        <TableHead className="text-right">{t('total', language)}</TableHead>
                        <TableHead className="text-right">{t('zakat', language)}</TableHead>
                        <TableHead className="text-right">{t('currency', language)}</TableHead>
                        <TableHead className="text-right">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculations.map((calculation) => (
                        <TableRow key={calculation.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            {formatDate(calculation.date)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getZakatTypeBadgeColor(calculation.type)}>
                              {getZakatTypeLabel(calculation.type)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {calculation.result?.total?.toFixed(2) || 0}
                          </TableCell>
                          <TableCell className="font-bold text-emerald-600">
                            {calculation.result?.zakat?.toFixed(2) || 0}
                          </TableCell>
                          <TableCell>
                            {calculation.currency || 'SAR'}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteCalculation(calculation.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;