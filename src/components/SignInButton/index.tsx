import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import Spinner from 'react-loader-spinner';

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { Container } from './styles';
import { rootColors } from '../../styles/globals';

export const SignInButton: React.FC = () => {
  const [session, loading] = useSession();

  return loading ? (
    <Container>
      <Spinner type="ThreeDots" color={rootColors.gray500} width={40} />
    </Container>
  ) : session ? (
    <Container onClick={() => signOut()}>
      <FaGithub color={rootColors.green} />
      {session.user.name}
      <FiX size={30} color={rootColors.gray500} />
    </Container>
  ) : (
    <Container onClick={() => signIn('github')}>
      <FaGithub color={rootColors.yellow500} />
      Sign in with Github
    </Container>
  );
};
