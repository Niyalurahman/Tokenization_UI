import { type Property, type Holding, type Payout, type Notification } from '../types';

export const mockProperties: Property[] = [
  {
    id: 1,
    name: 'Downtown Marina Apartment',
    location: 'Dubai, UAE',
    price: 1500000,
    yield: 6.5,
    category: 'Residential',
    imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=Property+1',
  },
  {
    id: 2,
    name: 'Business Bay Office Space',
    location: 'Dubai, UAE',
    price: 3200000,
    yield: 7.2,
    category: 'Commercial',
    imageUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Property+2',
  },
  {
    id: 3,
    name: 'Palm Jumeirah Villa',
    location: 'Dubai, UAE',
    price: 7800000,
    yield: 5.8,
    category: 'Villa',
    imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Property+3',
  },
  {
    id: 4,
    name: 'JVC Residential Tower',
    location: 'Dubai, UAE',
    price: 2100000,
    yield: 8.1,
    category: 'Residential',
    imageUrl: 'https://placehold.co/600x400/f59e0b/ffffff?text=Property+4',
  },
  {
    id: 5,
    name: 'Silicon Oasis Tech Park',
    location: 'Dubai, UAE',
    price: 4500000,
    yield: -1.5, // example of negative yield
    category: 'Commercial',
    imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Property+5',
  },
  {
    id: 6,
    name: 'Arabian Ranches Villa',
    location: 'Dubai, UAE',
    price: 5600000,
    yield: 6.0,
    category: 'Villa',
    imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Property+6',
  },
];

export const mockHoldings: Holding[] = [
  {
    propertyName: 'Downtown Marina Apartment',
    tokens: 500,
    currentValue: 5000,
    annualYieldRate: 6.5,
    tokenPriceAED: 10,
  },
  {
    propertyName: 'Business Bay Office Space',
    tokens: 1200,
    currentValue: 12000,
    annualYieldRate: 7.2,
    tokenPriceAED: 10,
  },
  {
    propertyName: 'JVC Residential Tower',
    tokens: 850,
    currentValue: 8500,
    annualYieldRate: 8.1,
    tokenPriceAED: 10,
  },
];

export const mockPayouts: Payout[] = [
  {
    date: '2023-10-01',
    amount: 27.08,
    propertyName: 'Downtown Marina Apartment',
  },
  {
    date: '2023-10-01',
    amount: 72.0,
    propertyName: 'Business Bay Office Space',
  },
  {
    date: '2023-09-01',
    amount: 27.08,
    propertyName: 'Downtown Marina Apartment',
  },
  {
    date: '2023-09-01',
    amount: 72.0,
    propertyName: 'Business Bay Office Space',
  },
];

export const mockNotifications: Notification[] = [
  { id: 1, message: 'Your payout of 27.08 AED is confirmed.' },
  { id: 2, message: 'New property "Arabian Ranches Villa" is now available.' },
  { id: 3, message: 'System maintenance scheduled for tonight at 2 AM.' },
];