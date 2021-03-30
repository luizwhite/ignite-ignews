import { Container, Content, Anchor } from './styles';

import Logo from '../../assets/logo.svg';
import { SignInButton } from '../SignInButton';

export const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo />

        <nav>
          <Anchor $active href="#">
            Home
          </Anchor>
          <Anchor href="#">Posts</Anchor>
        </nav>

        <SignInButton />
      </Content>
    </Container>
  );
};
