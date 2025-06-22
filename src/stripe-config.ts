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
    id: 'prod_example',
    priceId: 'prod_SXuFEqD893uju3', // Replace this with your actual Stripe Price ID
    name: 'Give Well Together',
    description: 'One Subscription. Countless Lives Changed.',
    mode: 'subscription',
    price: 15.00,
  },
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};