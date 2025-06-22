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
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};