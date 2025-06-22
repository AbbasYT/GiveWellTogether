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
    priceId: 'price_example_replace_with_real_stripe_price_id',
    name: 'Give Well Together',
    description: 'One Subscription. Countless Lives Changed.',
    mode: 'subscription',
    price: 15.00,
  },
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};