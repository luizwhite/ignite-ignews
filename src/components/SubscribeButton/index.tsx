import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import { Container, Content } from './styles';

interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!session) {
      !loading && signIn('github');
      return;
    } else if (session.user.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const { data } = await api.post('/subscribe');
      const { sessionId } = data;

      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
    }
  };

  return <Container onClick={handleSubscribe}>Subscribe now</Container>;
};

export default SubscribeButton;
