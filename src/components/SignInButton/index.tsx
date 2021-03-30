import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { Container, Content } from './styles';
import { rootColors } from '../../styles/globals';

export const SignInButton: React.FC = () => {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <Container>
      <FaGithub color={rootColors.green} />
      Luiz Augusto
      <FiX size={30} color={rootColors.gray500} />
    </Container>
  ) : (
    <Container>
      <FaGithub color={rootColors.yellow500} />
      Sign in with Github
    </Container>
  );
};
