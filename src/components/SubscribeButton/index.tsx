import { Container, Content } from './styles';

interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => (
  <Container>Subscribe now</Container>
);

export default SubscribeButton;
