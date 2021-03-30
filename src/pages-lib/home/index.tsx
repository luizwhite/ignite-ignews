import Head from 'next/head';

import { Container, Content } from './styles';

import Avatar from '../../assets/avatar.svg';
import SubscribeButton from '../../components/SubscribeButton';

export interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

const Home: React.FC<HomeProps> = ({ product }) => {
  const { priceId } = product;

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <Container>
        <Content>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <br />
            <span>React</span> world.
          </h1>

          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton {...{ priceId }} />
        </Content>

        <Avatar />
      </Container>
    </>
  );
};

export default Home;
