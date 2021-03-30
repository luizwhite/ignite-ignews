import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 260px;

  border-radius: calc(4rem / 2);
  background-color: var(--yellow-500);

  color: var(--gray-900);
  font-size: 1.25rem;
  font-weight: bold;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;

export const Content = styled.div``;
