export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'subscription' | 'payment';
  price: number;
  currency: string;
  interval?: 'month' | 'year';
}

export const stripeProducts: StripeProduct[] = [
  // Monthly plans
  {
    id: 'prod_SXueiN21mYwAYN',
    priceId: 'price_1RcoopRnYW51Zw7f2D5HGmIM',
    name: 'Give Well Together - Tier 3',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 10000, // $100.00 in cents
    currency: 'usd',
    interval: 'month'
  },
  {
    id: 'prod_SXudCGUIT0fOoa',
    priceId: 'price_1RcooDRnYW51Zw7fj51b9Cih',
    name: 'Give Well Together - Tier 2',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 5000, // $50.00 in cents
    currency: 'usd',
    interval: 'month'
  },
  {
    id: 'prod_SXuaPUklAwbREq',
    priceId: 'price_1RcolnRnYW51Zw7fMaZfU3R4',
    name: 'Give Well Together - Tier 1',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 1500, // $15.00 in cents
    currency: 'usd',
    interval: 'month'
  },
  // Yearly plans - UPDATE THESE PRICE IDs WITH YOUR ACTUAL STRIPE YEARLY PRICE IDs
  {
    id: 'prod_yearly_tier3',
    priceId: 'REPLACE_WITH_YEARLY_TIER3_PRICE_ID', // Replace with actual yearly price ID for $1200/year
    name: 'Give Well Together - Tier 3 (Yearly)',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 120000, // $1200.00 in cents
    currency: 'usd',
    interval: 'year'
  },
  {
    id: 'prod_yearly_tier2',
    priceId: 'REPLACE_WITH_YEARLY_TIER2_PRICE_ID', // Replace with actual yearly price ID for $600/year
    name: 'Give Well Together - Tier 2 (Yearly)',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 60000, // $600.00 in cents
    currency: 'usd',
    interval: 'year'
  }, 
  {
    id: 'prod_yearly_tier1',
    priceId: 'REPLACE_WITH_YEARLY_TIER1_PRICE_ID', // Replace with actual yearly price ID for $180/year
    name: 'Give Well Together - Tier 1 (Yearly)',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 18000, // $180.00 in cents
    currency: 'usd',
    interval: 'year'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function getMonthlyProducts(): StripeProduct[] {
  return stripeProducts.filter(product => product.interval === 'month');
}

export function getYearlyProducts(): StripeProduct[] {
  return stripeProducts.filter(product => product.interval === 'year');
}

export function formatPrice(priceInCents: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(priceInCents / 100);
}