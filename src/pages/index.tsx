import { GetStaticProps } from 'next';

import Home, { HomeProps } from '../pages-lib/home';
import { stripe } from '../services/stripe';

const App: React.FC<HomeProps> = ({ product }) => <Home {...{ product }} />;

export default App;

export const getStaticProps: GetStaticProps = async (_ctx) => {
  const price = await stripe.prices.retrieve('price_1IZQlNGXgTvYi96mBXBxUj92', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount! / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
