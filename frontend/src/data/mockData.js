// Mock data for development - will be replaced with real API calls
export const mockData = {
  calculations: [
    {
      id: 1,
      date: '2024-01-15T10:30:00.000Z',
      type: 'money',
      data: {
        cash: 50000,
        deposits: 100000,
        investments: 25000,
        debtsOwed: 10000,
        debtsOwing: 5000,
        currency: 'SAR'
      },
      result: {
        total: 180000,
        zakat: 4500,
        belowNisab: false
      },
      currency: 'SAR'
    },
    {
      id: 2,
      date: '2024-01-20T14:15:00.000Z',
      type: 'goldSilver',
      data: {
        goldGrams: 200,
        silverGrams: 1000,
        goldPrice: 220,
        silverPrice: 3,
        currency: 'SAR'
      },
      result: {
        total: 47000,
        zakat: 1175,
        belowNisab: false
      },
      currency: 'SAR'
    },
    {
      id: 3,
      date: '2024-02-01T09:45:00.000Z',
      type: 'trade',
      data: {
        goods: 75000,
        cash: 25000,
        debts: 10000,
        currency: 'SAR'
      },
      result: {
        total: 110000,
        zakat: 2750,
        belowNisab: false
      },
      currency: 'SAR'
    },
    {
      id: 4,
      date: '2024-02-15T16:20:00.000Z',
      type: 'agriculture',
      data: {
        cropValue: 100000,
        irrigationType: 'rain',
        currency: 'SAR'
      },
      result: {
        total: 100000,
        zakat: 10000,
        belowNisab: false,
        rate: 0.1
      },
      currency: 'SAR'
    },
    {
      id: 5,
      date: '2024-03-01T11:30:00.000Z',
      type: 'livestock',
      data: {
        camels: 15,
        cattle: 45,
        sheep: 150
      },
      result: {
        total: 210,
        zakat: 5,
        belowNisab: false,
        breakdown: {
          camelZakat: 3,
          cattleZakat: 1,
          sheepZakat: 1
        }
      },
      currency: 'SAR'
    }
  ],
  
  // Mock exchange rates (in practice, these would come from a real API)
  exchangeRates: {
    'SAR': 1,
    'USD': 0.27,
    'EUR': 0.24,
    'AED': 0.98
  },
  
  // Mock current market prices
  currentPrices: {
    gold: 220, // SAR per gram
    silver: 3, // SAR per gram
    nisab: {
      gold: 87.48, // grams
      silver: 612.36, // grams
      money: 19237.8 // SAR equivalent
    }
  }
};

// Helper functions for mock data
export const saveMockCalculation = (calculation) => {
  mockData.calculations.push(calculation);
  return calculation;
};

export const deleteMockCalculation = (id) => {
  mockData.calculations = mockData.calculations.filter(calc => calc.id !== id);
  return true;
};

export const getMockCalculations = () => {
  return [...mockData.calculations].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const fromRate = mockData.exchangeRates[fromCurrency] || 1;
  const toRate = mockData.exchangeRates[toCurrency] || 1;
  return (amount / fromRate) * toRate;
};