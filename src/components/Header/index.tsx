import { useRouter } from 'next/router';
import Link from 'next/link';

import { Container, Content, Anchor } from './styles';

import Logo from '../../assets/logo.svg';
import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

export const Header: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <Container>
      <Content>
        <Logo />

        <nav>
          <ActiveLink href="/" styledAnchor={Anchor}>Home</ActiveLink>
          <ActiveLink href="/posts" styledAnchor={Anchor}>Posts</ActiveLink>
        </nav>

        <SignInButton />
      </Content>
    </Container>
  );
};
