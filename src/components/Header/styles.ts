import styled, { css } from 'styled-components';

export interface AnchorProps {
  $active?: boolean
}

export const Container = styled.header`
  height: 5rem;
  border-bottom: 1px solid var(--gray-800);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  margin: 0 auto;
  padding: 0 2rem;

  max-width: 1120px;

  nav {
    margin-left: 5rem;
    height: 5rem;
  }

  button {
    margin-left: auto;
  }
`;

export const Anchor = styled.a<AnchorProps>`
  position: relative;
  display: inline-block;
  padding: 0 0.5rem;
  height: 5rem;

  line-height: 5rem;
  color: var(--gray-300);

  transition: color 0.3s;

  & + a {
    margin-left: 2rem;
  }

  &:hover {
    color: var(--white);
  }

  ${({ $active }) =>
    $active &&
    css`
      color: var(--white);
      font-weight: bold;

      &::after {
        position: absolute;
        top: calc(100% - 3px);
        left: 0;
        content: '';

        height: 3px;
        border-radius: 3px 3px 0 0;
        width: 100%;
        background-color: var(--yellow-500);
      }
    `}
`;
