import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useToast } from '../hooks/use-toast';
import { mockData } from '../data/mockData';
import { Calculator as CalcIcon, Save, RefreshCw, DollarSign, TrendingUp } from 'lucide-react';

const Calculator = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('money');
  const [results, setResults] = useState({});
  
  // Money Zakat State
  const [moneyData, setMoneyData] = useState({
    cash: 0,
    deposits: 0,
    investments: 0,
    debtsOwed: 0,
    debtsOwing: 0,
    currency: 'SAR'
  });

  // Gold/Silver Zakat State
  const [goldSilverData, setGoldSilverData] = useState({
    goldGrams: 0,
    silverGrams: 0,
    goldPrice: 220,
    silverPrice: 3,
    currency: 'SAR'
  });

  // Trade Zakat State
  const [tradeData, setTradeData] = useState({
    goods: 0,
    cash: 0,
    debts: 0,
    currency: 'SAR'
  });

  // Agriculture Zakat State
  const [agricultureData, setAgricultureData] = useState({
    cropValue: 0,
    irrigationType: 'rain',
    currency: 'SAR'
  });

  // Livestock Zakat State
  const [livestockData, setLivestockData] = useState({
    camels: 0,
    cattle: 0,
    sheep: 0
  });

  const nisabValues = {
    money: 87.48 * 4.25, // 85 grams of gold equivalent
    goldGrams: 87.48,
    silverGrams: 612.36,
    trade: 87.48 * 4.25,
    agriculture: 653 // kg equivalent
  };

  const calculateMoneyZakat = () => {
    const total = parseFloat(moneyData.cash) + parseFloat(moneyData.deposits) + 
                 parseFloat(moneyData.investments) + parseFloat(moneyData.debtsOwed) - 
                 parseFloat(moneyData.debtsOwing);
    
    if (total >= nisabValues.money) {
      const zakat = total * 0.025; // 2.5%
      setResults(prev => ({ ...prev, money: { total, zakat, belowNisab: false } }));
    } else {
      setResults(prev => ({ ...prev, money: { total, zakat: 0, belowNisab: true } }));
    }
  };

  const calculateGoldSilverZakat = () => {
    const goldValue = parseFloat(goldSilverData.goldGrams) * parseFloat(goldSilverData.goldPrice);
    const silverValue = parseFloat(goldSilverData.silverGrams) * parseFloat(goldSilverData.silverPrice);
    const total = goldValue + silverValue;
    
    const goldNisab = nisabValues.goldGrams * parseFloat(goldSilverData.goldPrice);
    const silverNisab = nisabValues.silverGrams * parseFloat(goldSilverData.silverPrice);
    const minNisab = Math.min(goldNisab, silverNisab);
    
    if (total >= minNisab) {
      const zakat = total * 0.025; // 2.5%
      setResults(prev => ({ ...prev, goldSilver: { total, zakat, belowNisab: false } }));
    } else {
      setResults(prev => ({ ...prev, goldSilver: { total, zakat: 0, belowNisab: true } }));
    }
  };

  const calculateTradeZakat = () => {
    const total = parseFloat(tradeData.goods) + parseFloat(tradeData.cash) + parseFloat(tradeData.debts);
    
    if (total >= nisabValues.trade) {
      const zakat = total * 0.025; // 2.5%
      setResults(prev => ({ ...prev, trade: { total, zakat, belowNisab: false } }));
    } else {
      setResults(prev => ({ ...prev, trade: { total, zakat: 0, belowNisab: true } }));
    }
  };

  const calculateAgricultureZakat = () => {
    const total = parseFloat(agricultureData.cropValue);
    const rate = agricultureData.irrigationType === 'rain' ? 0.1 : 0.05; // 10% or 5%
    
    if (total >= nisabValues.agriculture) {
      const zakat = total * rate;
      setResults(prev => ({ ...prev, agriculture: { total, zakat, belowNisab: false, rate } }));
    } else {
      setResults(prev => ({ ...prev, agriculture: { total, zakat: 0, belowNisab: true, rate } }));
    }
  };

  const calculateLivestockZakat = () => {
    const camels = parseInt(livestockData.camels);
    const cattle = parseInt(livestockData.cattle);
    const sheep = parseInt(livestockData.sheep);
    
    let camelZakat = 0, cattleZakat = 0, sheepZakat = 0;
    
    // Camel Zakat calculation
    if (camels >= 5) {
      if (camels <= 9) camelZakat = 1;
      else if (camels <= 14) camelZakat = 2;
      else if (camels <= 19) camelZakat = 3;
      else if (camels <= 24) camelZakat = 4;
      else camelZakat = Math.floor(camels / 5);
    }
    
    // Cattle Zakat calculation
    if (cattle >= 30) {
      cattleZakat = Math.floor(cattle / 30);
    }
    
    // Sheep Zakat calculation
    if (sheep >= 40) {
      if (sheep <= 120) sheepZakat = 1;
      else if (sheep <= 200) sheepZakat = 2;
      else sheepZakat = Math.floor(sheep / 100);
    }
    
    const total = camels + cattle + sheep;
    const totalZakat = camelZakat + cattleZakat + sheepZakat;
    
    setResults(prev => ({ 
      ...prev, 
      livestock: { 
        total, 
        zakat: totalZakat, 
        belowNisab: totalZakat === 0,
        breakdown: { camelZakat, cattleZakat, sheepZakat }
      } 
    }));
  };

  const resetForm = () => {
    setMoneyData({ cash: 0, deposits: 0, investments: 0, debtsOwed: 0, debtsOwing: 0, currency: 'SAR' });
    setGoldSilverData({ goldGrams: 0, silverGrams: 0, goldPrice: 220, silverPrice: 3, currency: 'SAR' });
    setTradeData({ goods: 0, cash: 0, debts: 0, currency: 'SAR' });
    setAgricultureData({ cropValue: 0, irrigationType: 'rain', currency: 'SAR' });
    setLivestockData({ camels: 0, cattle: 0, sheep: 0 });
    setResults({});
  };

  const saveCalculation = () => {
    const calculation = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: activeTab,
      data: getCurrentData(),
      result: results[activeTab],
      currency: getCurrentData().currency || 'SAR'
    };
    
    // Save to mock data (in real app, this would be an API call)
    mockData.calculations.push(calculation);
    
    toast({
      title: t('calculationSaved', language),
      description: `${t('zakatDue', language)}: ${results[activeTab]?.zakat || 0}`,
    });
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'money': return moneyData;
      case 'goldSilver': return goldSilverData;
      case 'trade': return tradeData;
      case 'agriculture': return agricultureData;
      case 'livestock': return livestockData;
      default: return {};
    }
  };

  const getCurrentCalculateFunction = () => {
    switch (activeTab) {
      case 'money': return calculateMoneyZakat;
      case 'goldSilver': return calculateGoldSilverZakat;
      case 'trade': return calculateTradeZakat;
      case 'agriculture': return calculateAgricultureZakat;
      case 'livestock': return calculateLivestockZakat;
      default: return () => {};
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4 flex items-center justify-center">
            <CalcIcon className="mr-3 w-10 h-10" />
            {t('calculator', language)}
          </h1>
          <p className="text-emerald-600 text-lg">{t('selectZakatType', language)}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="money" className="text-sm">{t('moneyZakat', language)}</TabsTrigger>
            <TabsTrigger value="goldSilver" className="text-sm">{t('goldSilverZakat', language)}</TabsTrigger>
            <TabsTrigger value="trade" className="text-sm">{t('tradeZakat', language)}</TabsTrigger>
            <TabsTrigger value="agriculture" className="text-sm">{t('agricultureZakat', language)}</TabsTrigger>
            <TabsTrigger value="livestock" className="text-sm">{t('livestockZakat', language)}</TabsTrigger>
          </TabsList>

          {/* Money Zakat Tab */}
          <TabsContent value="money">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 w-5 h-5" />
                  {t('moneyZakat', language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cash">{t('cashAmount', language)}</Label>
                    <Input
                      id="cash"
                      type="number"
                      value={moneyData.cash}
                      onChange={(e) => setMoneyData(prev => ({ ...prev, cash: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deposits">{t('bankDeposits', language)}</Label>
                    <Input
                      id="deposits"
                      type="number"
                      value={moneyData.deposits}
                      onChange={(e) => setMoneyData(prev => ({ ...prev, deposits: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="investments">{t('investments', language)}</Label>
                    <Input
                      id="investments"
                      type="number"
                      value={moneyData.investments}
                      onChange={(e) => setMoneyData(prev => ({ ...prev, investments: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="debtsOwed">{t('debtsOwed', language)}</Label>
                    <Input
                      id="debtsOwed"
                      type="number"
                      value={moneyData.debtsOwed}
                      onChange={(e) => setMoneyData(prev => ({ ...prev, debtsOwed: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="debtsOwing">{t('debtsOwing', language)}</Label>
                    <Input
                      id="debtsOwing"
                      type="number"
                      value={moneyData.debtsOwing}
                      onChange={(e) => setMoneyData(prev => ({ ...prev, debtsOwing: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">{t('currency', language)}</Label>
                    <Select value={moneyData.currency} onValueChange={(value) => setMoneyData(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">ريال سعودي</SelectItem>
                        <SelectItem value="USD">دولار أمريكي</SelectItem>
                        <SelectItem value="EUR">يورو</SelectItem>
                        <SelectItem value="AED">درهم إماراتي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {results.money && (
                  <div className="bg-emerald-50 p-4 rounded-lg border-2 border-emerald-200">
                    <h3 className="font-semibold text-emerald-800 mb-2">{t('zakatAmount', language)}</h3>
                    <p className="text-lg">
                      {t('total', language)}: {results.money.total.toFixed(2)} {moneyData.currency}
                    </p>
                    <p className="text-xl font-bold text-emerald-600">
                      {t('zakatDue', language)}: {results.money.zakat.toFixed(2)} {moneyData.currency}
                    </p>
                    {results.money.belowNisab && (
                      <p className="text-amber-600 mt-2">{t('belowNisab', language)}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gold/Silver Zakat Tab */}
          <TabsContent value="goldSilver">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 w-5 h-5" />
                  {t('goldSilverZakat', language)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goldGrams">{t('goldGrams', language)}</Label>
                    <Input
                      id="goldGrams"
                      type="number"
                      value={goldSilverData.goldGrams}
                      onChange={(e) => setGoldSilverData(prev => ({ ...prev, goldGrams: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goldPrice">{t('goldPrice', language)}</Label>
                    <Input
                      id="goldPrice"
                      type="number"
                      value={goldSilverData.goldPrice}
                      onChange={(e) => setGoldSilverData(prev => ({ ...prev, goldPrice: e.target.value }))}
                      placeholder="220"
                    />
                  </div>
                  <div>
                    <Label htmlFor="silverGrams">{t('silverGrams', language)}</Label>
                    <Input
                      id="silverGrams"
                      type="number"
                      value={goldSilverData.silverGrams}
                      onChange={(e) => setGoldSilverData(prev => ({ ...prev, silverGrams: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="silverPrice">{t('silverPrice', language)}</Label>
                    <Input
                      id="silverPrice"
                      type="number"
                      value={goldSilverData.silverPrice}
                      onChange={(e) => setGoldSilverData(prev => ({ ...prev, silverPrice: e.target.value }))}
                      placeholder="3"
                    />
                  </div>
                </div>
                
                {results.goldSilver && (
                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">{t('zakatAmount', language)}</h3>
                    <p className="text-lg">
                      {t('total', language)}: {results.goldSilver.total.toFixed(2)} {goldSilverData.currency}
                    </p>
                    <p className="text-xl font-bold text-yellow-600">
                      {t('zakatDue', language)}: {results.goldSilver.zakat.toFixed(2)} {goldSilverData.currency}
                    </p>
                    {results.goldSilver.belowNisab && (
                      <p className="text-amber-600 mt-2">{t('belowNisab', language)}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trade Zakat Tab */}
          <TabsContent value="trade">
            <Card>
              <CardHeader>
                <CardTitle>{t('tradeZakat', language)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tradeGoods">{t('tradeGoods', language)}</Label>
                    <Input
                      id="tradeGoods"
                      type="number"
                      value={tradeData.goods}
                      onChange={(e) => setTradeData(prev => ({ ...prev, goods: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tradeCash">{t('tradeCash', language)}</Label>
                    <Input
                      id="tradeCash"
                      type="number"
                      value={tradeData.cash}
                      onChange={(e) => setTradeData(prev => ({ ...prev, cash: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tradeDebts">{t('tradeDebts', language)}</Label>
                    <Input
                      id="tradeDebts"
                      type="number"
                      value={tradeData.debts}
                      onChange={(e) => setTradeData(prev => ({ ...prev, debts: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                {results.trade && (
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">{t('zakatAmount', language)}</h3>
                    <p className="text-lg">
                      {t('total', language)}: {results.trade.total.toFixed(2)} {tradeData.currency}
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      {t('zakatDue', language)}: {results.trade.zakat.toFixed(2)} {tradeData.currency}
                    </p>
                    {results.trade.belowNisab && (
                      <p className="text-amber-600 mt-2">{t('belowNisab', language)}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agriculture Zakat Tab */}
          <TabsContent value="agriculture">
            <Card>
              <CardHeader>
                <CardTitle>{t('agricultureZakat', language)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cropValue">{t('cropValue', language)}</Label>
                    <Input
                      id="cropValue"
                      type="number"
                      value={agricultureData.cropValue}
                      onChange={(e) => setAgricultureData(prev => ({ ...prev, cropValue: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label>{t('irrigationType', language)}</Label>
                    <RadioGroup
                      value={agricultureData.irrigationType}
                      onValueChange={(value) => setAgricultureData(prev => ({ ...prev, irrigationType: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rain" id="rain" />
                        <Label htmlFor="rain">{t('rainWater', language)} (10%)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="irrigation" id="irrigation" />
                        <Label htmlFor="irrigation">{t('irrigation', language)} (5%)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                {results.agriculture && (
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">{t('zakatAmount', language)}</h3>
                    <p className="text-lg">
                      {t('total', language)}: {results.agriculture.total.toFixed(2)} {agricultureData.currency}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {t('zakatDue', language)}: {results.agriculture.zakat.toFixed(2)} {agricultureData.currency}
                    </p>
                    <p className="text-sm text-green-700">
                      معدل الزكاة: {(results.agriculture.rate * 100).toFixed(1)}%
                    </p>
                    {results.agriculture.belowNisab && (
                      <p className="text-amber-600 mt-2">{t('belowNisab', language)}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Livestock Zakat Tab */}
          <TabsContent value="livestock">
            <Card>
              <CardHeader>
                <CardTitle>{t('livestockZakat', language)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="camels">{t('camels', language)}</Label>
                    <Input
                      id="camels"
                      type="number"
                      value={livestockData.camels}
                      onChange={(e) => setLivestockData(prev => ({ ...prev, camels: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cattle">{t('cattle', language)}</Label>
                    <Input
                      id="cattle"
                      type="number"
                      value={livestockData.cattle}
                      onChange={(e) => setLivestockData(prev => ({ ...prev, cattle: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sheep">{t('sheep', language)}</Label>
                    <Input
                      id="sheep"
                      type="number"
                      value={livestockData.sheep}
                      onChange={(e) => setLivestockData(prev => ({ ...prev, sheep: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                {results.livestock && (
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">{t('zakatAmount', language)}</h3>
                    <p className="text-lg">
                      إجمالي الرؤوس: {results.livestock.total}
                    </p>
                    <p className="text-xl font-bold text-purple-600">
                      الزكاة المستحقة: {results.livestock.zakat} رأس
                    </p>
                    {results.livestock.breakdown && (
                      <div className="mt-2 text-sm text-purple-700">
                        <p>إبل: {results.livestock.breakdown.camelZakat} رأس</p>
                        <p>بقر: {results.livestock.breakdown.cattleZakat} رأس</p>
                        <p>غنم: {results.livestock.breakdown.sheepZakat} رأس</p>
                      </div>
                    )}
                    {results.livestock.belowNisab && (
                      <p className="text-amber-600 mt-2">{t('belowNisab', language)}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={getCurrentCalculateFunction()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <CalcIcon className="mr-2 w-5 h-5" />
            {t('calculate', language)}
          </Button>
          
          <Button
            onClick={resetForm}
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-lg"
          >
            <RefreshCw className="mr-2 w-5 h-5" />
            {t('reset', language)}
          </Button>
          
          {results[activeTab] && !results[activeTab].belowNisab && (
            <Button
              onClick={saveCalculation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Save className="mr-2 w-5 h-5" />
              {t('save', language)}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;