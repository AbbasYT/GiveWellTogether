export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
}

export const products: Product[] = [
  {
    id: 'prod_SXuaPUklAwbREq',
    priceId: 'price_1RcolnRnYW51Zw7fMaZfU3R4',
    name: 'Give Well Together',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 15.00,
  },
  {
    id: 'prod_SXudCGUIT0fOoa',
    priceId: 'price_1RcooDRnYW51Zw7fj51b9Cih',
    name: 'Give Well Together',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 50.00,
  },
  {
    id: 'prod_SXueiN21mYwAYN',
    priceId: 'price_1RcoopRnYW51Zw7f2D5HGmIM',
    name: 'Give Well Together',
    description: 'One Payment. Countless Lives Changed',
    mode: 'subscription',
    price: 100.00,
  },
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};