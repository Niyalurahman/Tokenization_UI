export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  yield: number;
  category: 'Residential' | 'Commercial' | 'Villa';
  imageUrl: string;
}

export interface Holding {
  propertyName: string;
  tokens: number;
  currentValue: number;
  annualYieldRate: number;
  tokenPriceAED: number;
}

export interface Payout {
  date: string;
  amount: number;
  propertyName: string;
}

export interface Notification {
  id: number;
  message: string;
}