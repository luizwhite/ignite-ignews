import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 1.5rem;

  border-radius: 3rem;
  background-color: var(--gray-850);
  color: var(--white);
  font-weight: bold;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }

  svg {
    width: 20px;
    aspect-ratio: 1;

    &:first-child {
      margin-right: 1rem;
    }

    &:nth-child(2) {
      margin-left: 1rem;
    }
  }
`;

export const Content = styled.div``;
