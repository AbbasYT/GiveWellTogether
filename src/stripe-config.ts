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
  {
    id: 'prod_SXueiN21mYwAYN',
    priceId: 'price_1RcoopRnYW51Zw7f2D5HGmIM',
    name: 'Give Well Together',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 10000, // $100.00 in cents
    currency: 'usd',
    interval: 'month'
  },
  {
    id: 'prod_SXudCGUIT0fOoa',
    priceId: 'price_1RcooDRnYW51Zw7fj51b9Cih',
    name: 'Give Well Together',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 5000, // $50.00 in cents
    currency: 'usd',
    interval: 'month'
  },
  {
    id: 'prod_SXuaPUklAwbREq',
    priceId: 'price_1RcolnRnYW51Zw7fMaZfU3R4',
    name: 'Give Well Together',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 1500, // $15.00 in cents
    currency: 'usd',
    interval: 'month'
  }
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function formatPrice(priceInCents: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(priceInCents / 100);
}