import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { StyledComponent } from 'styled-components';

import { AnchorProps } from 'components/Header/styles';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement | string;
  styledAnchor: StyledComponent<'a', any, AnchorProps>;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  styledAnchor: Anchor,
  ...rest
}) => {
  const { pathname } = useRouter();
  const { href } = rest;

  return (
    <Link {...rest}>
      <Anchor {...(pathname === href && { $active: true })}>{children}</Anchor>
    </Link>
  );
};
